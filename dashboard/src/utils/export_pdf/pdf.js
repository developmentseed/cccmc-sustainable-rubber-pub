import blobStream from 'blob-stream'
import { saveAs } from 'file-saver'

import PDFDocument from './pdfkit'
import drawHeader from './pdf.header'
import drawFooter from './pdf.footer'
import drawMapArea from './pdf.map'
import drawAnalytics from './pdf.analytics'
import theme from '../../config/theme'
import { getTimestamp } from '../format'
/* eslint-disable camelcase */

// Base PDF options
const pdfDocumentOptions = {
  size: 'A4',
  margin: 40,
  bufferPages: true
}

// General layout options
const options = {
  ...pdfDocumentOptions,
  baseFontColor: '#374863',
  secondaryFontColor: '#6d788f',
  // primaryColor: '#23A6F5',
  primaryColor: theme.colors.primary,

  headerHeight: 96,

  colWidthTwoCol: 252,
  gutterTwoCol: 28,

  colWidthThreeCol: 160,
  gutterThreeCol: 26,
  tables: {
    rowSpacing: 3, // between text and bottom line
    padding: 20
  }
}

// fetch fonts & images on init for use in PDF
let styles, baseFont, boldFont, LogoCCCMC, notoFont

const loadAsset = async (url) => {
  const response = await fetch(url)
  return response.arrayBuffer()
}

async function initStyles () {
  baseFont = await loadAsset('assets/fonts/IBM-Plex-Sans-regular.ttf')
  boldFont = await loadAsset('/assets/fonts/IBM-Plex-Sans-Semibold.ttf')
  LogoCCCMC = await loadAsset('/assets/graphics/content/logos/CCCMC_LOGO.png')

  /**
   * Chinese support font for SVG
   * https://github.com/jsntn/webfonts
   * https://stackoverflow.com/a/63265873/2280137
   * normal: 'NotoSansSC-Regular.ttf',
   * bold: 'NotoSansTC-Regular.ttf',
   * italics: 'NotoSansSC-Regular.ttf',
   * bolditalics: 'NotoSansTC-Regular.ttf',
   * https://github.com/alafr/SVG-to-PDFKit/issues/35
   */
  notoFont = await loadAsset('assets/fonts/NotoSansSC-Regular.ttf')

  styles = {
    h1: {
      fontSize: 20,
      padding: 20,
      fillColor: options.baseFontColor,
      font: boldFont
    },
    h2: {
      fontSize: 16,
      padding: 10,
      fillColor: options.baseFontColor,
      font: boldFont
    },
    h3: {
      fontSize: 14,
      padding: 10,
      fillColor: options.baseFontColor,
      font: boldFont
    },
    h4: {
      fontSize: 12,
      padding: 10,
      fillColor: options.baseFontColor,
      font: boldFont
    },
    h5: {
      fontSize: 11,
      padding: 10,
      fillColor: options.baseFontColor,
      font: boldFont
    },
    h6: {
      fontSize: 10,
      padding: 10,
      fillColor: options.baseFontColor,
      font: boldFont
    },
    p: {
      fontSize: 8,
      padding: 10,
      fillColor: options.baseFontColor,
      font: baseFont
    }
  }
}

// /**
//  * Apply defined styles to the current documento location
//  * @param {Object} doc The document object.
//  * @param {String} element Element type key, must be available in `styles` object.
//  */
// function setStyle (doc, element) {
//   const { fillColor, font, fontSize } = styles[element]
//   doc.fillColor(fillColor).font(font).fontSize(fontSize)
// }

export default async function exportPDF ({ data, language }) {
  // Load styles
  await initStyles()

  // Create a document
  const doc = new PDFDocument(pdfDocumentOptions)

  // in order to use in chinese  svg files
  doc.registerFont('NotoSansSC', notoFont)
  doc.font('NotoSansSC')

  // Create stream
  const stream = doc.pipe(blobStream())

  // Add header sections
  drawHeader(options, { boldFont, baseFont, notoFont }, doc, data)

  // Draw map on the document
  drawMapArea(options, { boldFont, baseFont, notoFont }, doc, data)

  // Draw analitics on the map
  drawAnalytics(options, styles, { boldFont, baseFont, notoFont }, doc, data)

  // Add footer to each page
  const pages = doc.bufferedPageRange()
  for (let i = 0; i < pages.count; i++) {
    doc.switchToPage(i)
    drawFooter(options, { LogoCCCMC, boldFont, baseFont }, doc)
  }

  // Finalize PDF file
  doc.end()
  return stream.on('finish', function () {
    saveAs(stream.toBlob('application/pdf'), `cccmc-summary-${language}-${getTimestamp()}.pdf`)
  })
}
