import exportPDF from './pdf'
import getCharts from './getCharts'
import getMap from './getMap'
import { compileDataString } from '../format'

/**
 * Function to export data as PDF, fron selected boundary
 */
export default async ({
  boundaryProperties,
  objsForPlottingTranslated,
  adminLevel,
  allLayers,
  language
}) => {
  // Get Map in base64
  const { mapDataURL, mapAspectRatio } = getMap()

  // Get data from properties for bounruary, and format some of the in legend and data
  const selectedBounduaryInfo = objsForPlottingTranslated.map((attrb) => {
    return {
      label: attrb.title,
      unit: attrb.unit,
      strData: compileDataString(attrb.data, attrb.unit, '   |   '),
      key: attrb.key,
      legend: attrb.data
    }
  })

  // Get Info for pdf title
  const selectedArea = {
    name: boundaryProperties.shapename,
    type: adminLevel
  }

  // Get charts as image/png base64
  const charts = await getCharts(selectedBounduaryInfo)

  // All compiled data to generate the PDF
  const data = {
    map: {
      mapDataURL,
      mapAspectRatio
    },
    selectedBounduaryInfo,
    selectedArea,
    charts
  }
  setTimeout(() => exportPDF({ data, language }), 3000)
}
