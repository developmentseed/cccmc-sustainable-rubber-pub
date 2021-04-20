import { saveAs } from 'file-saver'

import getMap from '../export_pdf/getMap'
import dataURItoBlob from './data-uri-to-blob'
import { getTimestamp } from '../format'

export default async ({ boundaryProperties }) => {
  // Get Map in base64
  const { mapDataURL } = getMap()
  saveAs(
    dataURItoBlob(mapDataURL),
    `cccmc-${boundaryProperties.shapename}-map-snapshot-${getTimestamp()}.png`
  )
}
