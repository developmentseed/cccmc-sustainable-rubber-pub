export default [
  // Protected areas
  {
    id: 'ctrl_country_protected_areas_la',
    label: 'Protected areas',
    defaultVisibility: false,
    legend: 'none',
    legendMap: [
      {
        value: 'Protected area',
        color: '#5f5449'
      }
    ],
    layerIds: ['protected_areas_la'],
    chartsIds: ['protected_area'],
    info: 'Protected areas'
  },
  // Tiger conservation areas
  {
    id: 'ctrl_country_tiger_conservation_landscapes_la',
    label: 'Tiger conservation areas',
    defaultVisibility: false,
    legend: 'none',
    legendMap: [
      {
        value: 'Tiger conservation area',
        color: '#97d8c4'
      }
    ],
    layerIds: ['tiger_conservation_landscapes_la'],
    chartsIds: ['tiger_conservation_area'],
    info: 'Tiger conservation areas'
  },
  // Forest loss
  {
    id: 'ctrl_forest_loss_la_layer',
    label: 'Forest loss',
    defaultVisibility: false,
    legend: 'none',
    legendMap: [
      {
        value: '2001 - 2010',
        color: '#ffdd9e'
      },
      {
        value: '2011 - 2015',
        color: '#ffb867'
      },
      {
        value: '2016 - 2018',
        color: '#f06923'
      },
      {
        value: '2019',
        color: '#0030b8'
      }
    ],
    layerIds: ['forest_loss_la_layer'],
    chartsIds: ['forest_loss'],
    info: 'Forest loss'
  },
  // Landslide
  {
    id: 'ctrl_landslide_risk_la_layer',
    label: 'Landslides',
    defaultVisibility: false,
    legend: 'none',
    legendMap: [
      {
        value: 'Slight',
        color: '#ffba08'
      },
      {
        value: 'Slight - Moderate',
        color: '#f48c06'
      },
      {
        value: 'Moderate',
        color: '#e85d04'
      },
      {
        value: 'Moderate - Severe',
        color: '#d00000'
      },
      {
        value: 'Severe',
        color: '#6a040f'
      }
    ],
    layerIds: ['landslide_risk_la_layer'],
    chartsIds: ['landslide_risk'],
    info: 'Landslides'
  },
  // Flood
  {
    id: 'ctrl_country_coastal_flood_risk_la',
    label: 'Costal flood',
    defaultVisibility: false,
    legend: 'none',
    legendMap: [
      {
        value: 'Low',
        color: '#e3f2fd'
      },
      {
        value: 'Low - Medium',
        color: '#bbdefb'
      },
      {
        value: 'Medium - High',
        color: '#90caf9'
      },
      {
        value: 'High',
        color: '#42a5f5'
      },
      {
        value: 'Extremely high',
        color: '#1976d2'
      }
    ],
    layerIds: ['coastal_flood_risk_la'],
    chartsIds: ['coastal_flood_risk'],
    info: 'Costal flood'
  },
  {
    id: 'ctrl_country_riverine_flood_risk_la',
    label: 'Riverine flood',
    defaultVisibility: false,
    legend: 'none',
    legendMap: [
      {
        value: 'Low',
        color: '#ebf5fb'
      },
      {
        value: 'Low - Medium',
        color: '#aed6f1'
      },
      {
        value: 'Medium - High',
        color: '#5dade2'
      },
      {
        value: 'High',
        color: '#2e86c1'
      },
      {
        value: 'Extremely high',
        color: '#1b4f72'
      }
    ],
    layerIds: ['riverine_flood_risk_la'],
    chartsIds: ['riverine_flood_risk'],
    info: 'Riverine flood'
  },
  // Drought
  {
    id: 'ctrl_country_drought_risk_la',
    label: 'Drought',
    defaultVisibility: false,
    legend: 'none',
    legendMap: [
      {
        value: 'Low - Medium',
        color: '#ff9017'
      },
      {
        value: 'Medium',
        color: '#ff6d00'
      },
      {
        value: 'Medium - High',
        color: '#e86300'
      }
    ],
    layerIds: ['drought_risk_la'],
    chartsIds: ['drought_risk'],
    info: 'Drought'
  }
]
