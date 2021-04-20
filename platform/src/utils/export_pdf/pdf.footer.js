/**
 * Draw Footer
 */
export default function drawFooter (
  options,
  { LogoCCCMC, boldFont, baseFont },
  doc
) {
  doc
    .rect(0, doc.page.height - options.margin * 2, doc.page.width, 1)
    .fillColor('#1F2A50', 0.12)
    .fill()

  doc.fontSize(8).fillOpacity(1)

  // // Footer
  doc.image(LogoCCCMC, options.margin, doc.page.height - options.margin * 1.25, {
    height: 18
  })

  // Left Title
  doc
    .fillColor(options.primaryColor)
    .font(boldFont)
    .text(
      'CCCMC',
      options.margin * 1.5 + 4,
      doc.page.height - options.margin * 1.25,
      {
        width: options.colWidthTwoCol,
        height: 16,
        align: 'left',
        link: 'https://cccmc-sustainable-rubber.surges'
      }
    )

  // Left Subtitle
  doc
    .fillColor(options.secondaryFontColor)
    .font(baseFont)
    .fontSize(6)
    .text(
      'https://cccmc-sustainable-rubber.surge',
      options.margin * 1.5 + 4,
      doc.page.height - options.margin,
      {
        width: options.colWidthTwoCol,
        height: 16,
        align: 'left'
      }
    )

  // Right license
  doc
    .fillColor(options.baseFontColor)
    .text(
      'Creative Commons BY 4.0',
      doc.page.width - options.colWidthTwoCol - options.margin,
      doc.page.height - options.margin * 1.25,
      {
        width: options.colWidthTwoCol,
        height: 16,
        align: 'right',
        link: 'https://creativecommons.org/licenses/by/4.0/'
      }
    )

  // Right date
  doc.text(
    new Date().getFullYear(),
    doc.page.width - options.colWidthTwoCol - options.margin,
    doc.page.height - options.margin * 1.25 + 12,
    {
      width: options.colWidthTwoCol,
      height: 16,
      align: 'right'
    }
  )
}
