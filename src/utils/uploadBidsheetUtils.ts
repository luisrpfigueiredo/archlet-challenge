import { Worksheet } from 'exceljs'

export const getSupplierColumnIndex = (worksheet: Worksheet): number => {
  let supplierColIdx: number = 0
  worksheet.getRow(1).eachCell((cell, colNumber) => {
    console.log('cell value: ', cell.value)
    if ((<string>cell.value)?.trim() == 'Supplier' && !supplierColIdx) {
      supplierColIdx = colNumber
    }
  })

  return supplierColIdx
}
