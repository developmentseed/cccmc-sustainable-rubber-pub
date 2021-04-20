/**
 *
 * @param {string} chartId is the id of the charts in the rightbar of the dashboard
 * @returns svg string
 */
export async function getSVG (chartId) {
  const svg = document.getElementById(`pdf_${chartId}`)

  if (svg != null) {
    // on display:node mode not shows width, height
    const { width, height } = svg.getBBox()
    const svgString = new XMLSerializer().serializeToString(svg)
    return {
      svgString,
      width,
      height
    }
  } else {
    return { svgString: null }
  }
}

/**
 * @param {feature} dataLayer, it is a geojson object that user clicked on the map , and that contains the charts Id
 */
export default async (selectedDataAttributes) => {
  const charts = await Promise.all(
    selectedDataAttributes.map(async (attrb) => {
      const svgObj = await getSVG(attrb.key)
      return {
        ...attrb,
        ...svgObj
      }
    })
  )
  return charts.filter((obj) => obj.svgString)
}
