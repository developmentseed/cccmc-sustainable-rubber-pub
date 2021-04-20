import get from 'lodash.get'

import { drawSectionHeader } from './pdf.utils'
/**
 * Draw Map & Area Summary
 */
export default function drawMapArea (
  options,
  { boldFont, baseFont, notoFont },
  doc,
  { selectedBounduaryInfo, map: { mapDataURL, mapAspectRatio } }
) {
  // Limit map height to a column width. This results in a square aspect ratio of the map
  const mapWidth = options.colWidthTwoCol * 2
  const mapHeight = doc.page.height - doc.page.height / 2 - options.headerHeight
  // mapAspectRatio > 1 ? mapWidth : mapWidth * mapAspectRatio
  // MAP AREA
  // Background color on the full map area
  doc.rect(0, options.headerHeight, doc.page.width, mapHeight).fill('#f6f7f7')

  // Map (1/2)
  doc.image(mapDataURL, options.margin, options.headerHeight, {
    fit: [mapWidth, mapHeight],
    align: 'center',
    valign: 'center'
  })

  // Map area outline
  doc
    .rect(0, options.headerHeight, doc.page.width, 1)
    .fillColor('#192F35', 0.08)
    .fill()

  doc
    .rect(0, options.headerHeight + mapHeight - 1, doc.page.width, 1)
    .fillColor('#00ffff', 0.08)
    .fill()

  // Area header
  drawSectionHeader(
    'Summary',
    options.margin,
    options.headerHeight + mapHeight + 20,
    doc,
    options,
    { boldFont, baseFont }
  )

  /**
   * Area Summary table
   */
  const summaryTable = {
    columnAlignment: ['left', 'right'],
    cells: selectedBounduaryInfo.map((line) => {
      let label = line.label
      if (line.unit) {
        label = `${label}`// (${line.unit})
      }
      const value = line.strData
      return [label, value]
    })
  }

  doc.table(summaryTable, options.margin, doc.y + 12, {
    width: doc.page.width - options.margin * 2,
    prepareHeader: () => doc.font('NotoSansSC'),
    prepareRow: (row, i) => doc.font('NotoSansSC')
  })
  doc.y += get(options, 'tables.padding', 0)
}
