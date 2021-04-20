export default [
  // Landuse
  {
    id: 'ctrl_landuse_vn_layer',
    label: 'Land use',
    defaultVisibility: false,
    legend: 'none',
    legendMap: [
      {
        value: 'Shrubland',
        color: '#faefcf'
      },
      {
        value: 'Herbaceous vegetation',
        color: '#9e5b2e'
      },
      {
        value: 'Cropland',
        color: '#6a3d0b'
      },
      {
        value: 'Bare / sparse vegetation',
        color: '#66543b'
      },
      {
        value: 'Herbaceous wetland',
        color: '#b6c197'
      },
      {
        value: 'Moss & lichen',
        color: '#587055'
      },
      {
        value: 'Forest',
        color: '#2d6a4f'
      }
    ],
    layerIds: ['landuse_vn_layer'],
    chartsIds: ['landuse'],
    info: 'Land use'
  }
]
