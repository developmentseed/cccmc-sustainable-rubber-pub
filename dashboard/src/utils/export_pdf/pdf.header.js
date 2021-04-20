import config from '../../config'
import { toTitleCase } from '../format'

/**
 * Draw Header
 */
export default function drawHeader (options, { boldFont, baseFont }, doc, { selectedArea }) {
  const leftTitleSize = 20
  const rightTitleSize = 12
  const subTitleSize = 8
  const padding = 15

  // Left Title
  doc
    .fillColor(options.baseFontColor)
    .font(boldFont)
    .fontSize(leftTitleSize)
    .text(selectedArea.name, options.margin, options.margin)

  // Left Subtitle
  doc
    .fillColor(options.secondaryFontColor)
    .font(baseFont)
    .fontSize(subTitleSize)
    .text(toTitleCase(selectedArea.type), options.margin, options.margin + 24)

  // Right Title
  doc
    .fillColor(options.baseFontColor)
    .font(boldFont)
    .fontSize(rightTitleSize)
    .text(
      config.siteAcronym,
      doc.page.width - options.colWidthTwoCol - options.margin,
      options.margin,
      {
        width: options.colWidthTwoCol,
        align: 'right'
      }
    )

  // Right Subtitle
  doc
    .fillColor(options.secondaryFontColor)
    .font(baseFont)
    .fontSize(subTitleSize)
    .text(
      config.siteName,
      doc.page.width - options.colWidthTwoCol - options.margin,
      options.margin + 16,
      {
        width: options.colWidthTwoCol,
        height: 16,
        align: 'right'
      }
    )

  // Move cursor down
  doc.y = options.margin + leftTitleSize + subTitleSize + padding
  doc.x = options.margin
}
