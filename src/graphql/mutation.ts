import { Workbook } from 'exceljs'
import { idArg, mutationField, nonNull, stringArg } from 'nexus'
import {
  buildItemsWithBids,
  Item,
  saveItemsAndBids,
} from '../utils/uploadBidsheetUtils'

export const uploadBidsheet = mutationField('uploadBidsheet', {
  type: 'Project',
  args: {
    organizationId: nonNull(idArg()),
    projectName: nonNull(stringArg()),
    file: nonNull('Upload'),
  },
  resolve: async (_parent, args, { prisma }) => {
    const { createReadStream } = await args.file
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

    // It would be awesome if this part worked. In theory this prunes useless rows - but excelJS is buggy
    if (worksheet.actualRowCount < worksheet.rowCount) {
      worksheet.eachRow((row, rowNumber) => {
        if (!row.hasValues) {
          worksheet.spliceRows(rowNumber, 1)
        }
      })
    }

    const items = buildItemsWithBids(worksheet, newProject.id)

    await saveItemsAndBids(items, prisma)

    return newProject
  },
})
