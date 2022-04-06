import { Workbook } from 'exceljs'
import { idArg, mutationField, nonNull, stringArg } from 'nexus'
import { buildItemsWithBids, Item } from '../utils/uploadBidsheetUtils'

export const uploadBidsheet = mutationField('uploadBidsheet', {
  type: 'Project',
  args: {
    organizationId: nonNull(idArg()),
    projectName: nonNull(stringArg()),
    file: nonNull('Upload'),
  },
  resolve: async (_parent, args, { prisma }) => {
    const { filename, mimetype, createReadStream } = await args.file
    const stream = createReadStream()

    const workbook = new Workbook()
    await workbook.xlsx.read(stream)

    if (workbook.worksheets.length === 0) return null

    const worksheet = workbook.worksheets[0]

    const newProject = await prisma.project.create({
      data: {
        name: args.projectName,
        organizationId: args.organizationId,
      },
    })

    /**
     * TODO: Add your code to parse the uploaded excel file and save it to the database.
     */
    // console.log({ filename, mimetype, workbook })

    const items = buildItemsWithBids(worksheet, newProject.id)

    // So it turns out prisma doesn't support nested createMany... https://github.com/prisma/prisma/issues/5455
    // Which means I'll have to iterate through every item and create as an individual operation...

    const buildBidsQuery = (item: Item) => {
      const bidsQuery = item.bids.map((bid) => ({
        supplierName: bid.supplierName,
        customBidProperties: {
          createMany: {
            data: [...bid.bidProperties],
          },
        },
      }))

      return bidsQuery
    }

    items.forEach(async (item, itemIndex) => {
      await prisma.item.create({
        data: {
          name: item.name,
          projectId: item.projectId,
          customProperties: {
            createMany: {
              data: [...item.itemProperties],
            },
          },
          bids: {
            createMany: {
              data: buildBidsQuery(item),
            },
          },
        },
      })
    })

    const itemsInserted = await prisma.item.findMany()
    const customItemProperties = await prisma.customItemProperty.findMany()
    const bids = await prisma.bid.findMany()
    console.log('bids: ', bids)

    // for (let row of worksheet.getSheetValues()) {
    //   console.log('row here: ', row)
    // }

    return newProject
  },
})
