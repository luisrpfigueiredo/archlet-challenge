import { Workbook } from 'exceljs'
import { idArg, mutationField, nonNull, stringArg } from 'nexus'
import { getSupplierColumnIndex } from '../utils/uploadBidsheetUtils'

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
    console.log('worksheet rowcount: ', worksheet.rowCount)
    console.log('worksheet actualrowcount: ', worksheet.actualRowCount)
    // console.log('worksheet columnkey?', worksheet.columns)
    // console.log('worksheet columnkey?', worksheet.getColumnKey('0'))

    let supplierColIdx = getSupplierColumnIndex(worksheet)

    console.log('supplier idx: ', supplierColIdx)

    const spliced = worksheet.spliceColumns(1, supplierColIdx)

    console.log('spliced: ', spliced)
    console.log(
      'worksheet.getRow',
      worksheet.getRow(1).eachCell((cell, colNumber) => {
        console.log('cell value: ', cell.value)
        console.log('col number: ', colNumber)
      }),
    )

    // for (let row of worksheet.getSheetValues()) {
    //   console.log('row here: ', row)
    // }

    return newProject
  },
})
