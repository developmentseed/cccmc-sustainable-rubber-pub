export function drawSectionHeader (label, left, top, doc, options, { boldFont, baseFont }) {
  doc.fontSize(12)
  doc.fillColor(options.baseFontColor, 1).font('NotoSansSC').text(label, left, top)
  // const rectLength = `${label}`.length * 10
  doc.rect(left, top + 18, 50, 2).fill(options.primaryColor)

  doc.fontSize(8) // reset font size after drawing section header
  doc.fillColor(options.baseFontColor, 1) // reset color after drawing section header
  doc.font('NotoSansSC') // reset font after drawing section header
}

/**
 * Apply defined styles to the current documento location
 * @param {Object} doc The document object.
 * @param {String} element Element type key, must be available in `styles` object.
 */
export function setStyle (styles, doc, element) {
  const { fillColor, font, fontSize } = styles[element]
  doc.fillColor(fillColor).font(font).fontSize(fontSize)
}

export function drawLegendBar (left, top, doc, options, { boldFont, baseFont }) {
  doc.rect(left, top + 18, 24, 8).fill(options.primaryColor)
}
