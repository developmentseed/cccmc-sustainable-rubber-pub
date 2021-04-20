import { saveAs } from 'file-saver'

import { compileDataString, getTimestamp } from '../format'

export default async ({
  objsForPlottingTranslated,
  boundaryProperties,
  adminLevel
}) => {
  const selectedBounduaryInfo = objsForPlottingTranslated.map((attrb) => {
    return {
      layer: attrb.title,
      values: compileDataString(attrb.data, attrb.unit, ';').replace(/,/g, '').replace(/;/g, ','),
      admin: adminLevel,
      adminName: boundaryProperties.shapename
    }
  })

  const csvString = [
    ['admin', 'adminName', 'layer', 'values'],
    ...selectedBounduaryInfo.map((item) => [
      item.admin,
      item.adminName,
      item.layer,
      item.values
    ])
  ]
    .map((e) => e.join(';'))
    .join('\n')

  const blob = new Blob([csvString], {
    type: 'text/plain;charset=utf-8'
  })
  saveAs(
    blob,
    `cccmc-${boundaryProperties.shapename}-values-${getTimestamp()}.csv`
  )
}
