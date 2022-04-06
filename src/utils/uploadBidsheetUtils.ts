import { Worksheet } from 'exceljs'

export interface Item {
  name: string
  projectId: string
  itemProperties: Object[]
  bids: Bid[]
}
interface Bid {
  supplierName: string
  bidProperties: Object[]
}

export const getSupplierColumnIndex = (worksheet: Worksheet): number => {
  let supplierColIdx: number = 0
  worksheet.getRow(1).eachCell((cell, colNumber) => {
    if ((<string>cell.value)?.trim() == 'Supplier' && !supplierColIdx) {
      supplierColIdx = colNumber
    }
  })

  return supplierColIdx
}

export const getItemAndBidPropNames = (
  worksheet: Worksheet,
  supplierColIdx: number,
) => {
  const itemPropNames: String[] = []
  const bidPropNames: String[] = []
  worksheet.getRow(2).eachCell((cell, colIdx) => {
    if (colIdx < supplierColIdx) {
      itemPropNames.push(<string>cell.value)
      return
    }

    bidPropNames.push(<string>cell.value)
  })

  return {
    itemPropNames,
    bidPropNames,
  }
}

export const buildItemsWithBids = (
  worksheet: Worksheet,
  newProjectId: string,
) => {
  const supplierColIdx = getSupplierColumnIndex(worksheet)
  const { itemPropNames, bidPropNames } = getItemAndBidPropNames(
    worksheet,
    supplierColIdx,
  )
  const items: Item[] = []

  worksheet.getSheetValues().forEach((row, rowIndex) => {
    if (rowIndex < 3) return

    const existingItem = items.find((value) => {
      return value.name === row[1]
    })

    const newItem: Item = {
      name: row[1].result ? row[1].result : row[1],
      projectId: newProjectId,
      itemProperties: [],
      bids: [],
    }

    const newBid: Bid = {
      supplierName: row[supplierColIdx],
      bidProperties: [],
    }

    row?.forEach((cellValue: string, cellIdx: number) => {
      if (cellIdx < 3 || cellIdx === supplierColIdx) {
        return
      }

      if (cellIdx < supplierColIdx) {
        newItem.itemProperties.push({
          name: itemPropNames[cellIdx - 1],
          value: cellValue.toString(),
        })

        return
      }

      newBid.bidProperties.push({
        name: bidPropNames[cellIdx - supplierColIdx],
        value: cellValue.toString(),
      })
    })

    if (existingItem) {
      existingItem.bids.push(newBid)
      return
    }

    newItem.bids.push(newBid)
    items.push(newItem)
  })

  return items
}
