import SVGtoPDF from 'svg-to-pdfkit'

import { drawSectionHeader } from './pdf.utils'
import { toTitleCase } from '../format'

/**
 * Draw Analysis Input
 */
export default function drawAnalytics (
  options,
  styles,
  { boldFont, baseFont, notoFont },
  doc,
  data
) {
  // Add filters section (ranges must be available)
  doc.addPage()

  // Filters header
  // drawSectionHeader('Analytics', doc.x, doc.y, doc, options, {
  //   boldFont,
  //   baseFont
  // })

  const { charts } = data

  charts.forEach((chart, index) => {
    // const currentY = doc.y
    const chartWidth = chart.width
    const chartHeight = chart.height
    const legend = chart['legend']

    // Draw title for graph
    const titleX = options.margin
    const titleY = doc.y + 20
    drawSectionHeader(toTitleCase(chart.label), titleX, titleY, doc, options, {
      boldFont: notoFont,
      baseFont: notoFont
    })

    // Draw the chart SVG
    const chartX = options.margin // (options.margin * 2 * chartWidth) / doc.page.width
    const chartY = titleY + 50

    // Ref: https://github.com/alafr/SVG-to-PDFKit/issues/72
    SVGtoPDF(doc, chart.svgString, chartX, chartY, {
      width: chartWidth,
      height: chartHeight,
      fontCallback: () => 'NotoSansSC'
    })

    // Draw legend
    let legendBarY = chartY + chartHeight - 60
    legend.forEach((item) => {
      doc
        .lineCap('butt')
        .moveTo(chartX + 50, legendBarY)
        .lineTo(chartX + 50 + 10, legendBarY)
        .lineWidth(10)
        .fillAndStroke(item.fill, item.fill)
      doc
        .fillColor(options.secondaryFontColor)
        .font('NotoSansSC')
        .fontSize(10)
        .text(item.name, chartX + 75, legendBarY - 8)

      doc
        .fillColor(options.secondaryFontColor)
        .font('NotoSansSC')
        .fontSize(10)
        .text(item.val, chartX + 200, legendBarY - 8)

      legendBarY = legendBarY + 15
    })

    doc.y = legendBarY

    // Add other page
    // if ((index + 1) % 2 == 0) {
    doc.addPage()
    // }
  })
}
