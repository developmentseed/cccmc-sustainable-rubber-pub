export const agepop_2010 = {
  key: 'agepop_2010',
  title: 'Labor availability',
  type: 'numChart',
  unit: 'people'
}

/***
 * Setting up config for population labor avaliability for county  - LA
 */
export const agepop_2010_stat_cat_la = {
  key: 'agepop_2010',
  title: 'Labor availability',
  type: 'numChart',
  unit: 'people',
  config: {
    0: {
      name: 'No data',
      fill: '#f8f9f9'
    },
    1: {
      name: 'Less than 15023',
      fill: '#eab8a2'
    },
    2: {
      name: '15023 - 30334',
      fill: '#d69f7e'
    },
    3: {
      name: '30334 - 65410',
      fill: '#c38e70'
    },
    4: {
      name: '65410 - 106425',
      fill: '#9d6b53'
    },
    5: {
      name: 'Over 106425',
      fill: '#774936'
    }
  }
}

export const agepop_2010_stat_cat_mm = {
  key: 'agepop_2010_stat_cat',
  title: 'Labor availability',
  type: 'barChart',
  unit: 'people',
  config: {
    0: {
      name: 'No data',
      fill: '#f8f9f9'
    },
    1: {
      name: 'Less than 144201',
      fill: '#eab8a2'
    },
    2: {
      name: '144201 - 307623',
      fill: '#d69f7e'
    },
    3: {
      name: '307623 - 621810',
      fill: '#c38e70'
    },
    4: {
      name: '621810 - 1002498',
      fill: '#9d6b53'
    },
    5: {
      name: 'Over 1002498',
      fill: '#774936'
    }
  }
}

export const agepop_2010_stat_cat_vn = {
  key: 'agepop_2010_stat_cat',
  title: 'Labor availability',
  type: 'barChart',
  unit: 'people',
  config: {
    0: {
      name: 'No data',
      fill: '#f8f9f9'
    },
    1: {
      name: 'Less than 15082',
      fill: '#eab8a2'
    },
    2: {
      name: '15082 - 30323',
      fill: '#d69f7e'
    },
    3: {
      name: '30323 - 60049',
      fill: '#c38e70'
    },
    4: {
      name: '60049 - 100933',
      fill: '#9d6b53'
    },
    5: {
      name: 'Over 100933',
      fill: '#774936'
    }
  }
}

export const tiger_conservation_area = {
  key: 'tiger_conservation_area',
  title: 'Tiger conservation area',
  type: 'numChart',
  unit: 'km²'
}

export const protected_area = {
  key: 'protected_area',
  title: 'Protected area',
  type: 'numChart',
  unit: 'km²'
}

export const market_acc_stat = {
  key: 'market_acc_stat',
  title: 'Market accessibility',
  type: 'barChart',
  unit: '%',
  config: {
    1.0: {
      name: '<=3 hours',
      fill: '#d6eaf8'
    },
    2.0: {
      name: '<=6 hours',
      fill: '#aed6f1'
    },
    3.0: {
      name: '<=12 hours',
      fill: '#85c1e9'
    },
    4.0: {
      name: '<=1 day',
      fill: '#5dade2'
    },
    5.0: {
      name: '>1 day',
      fill: '#2e86c1'
    }
  }
}

export const landslide_risk = {
  key: 'landslide_risk',
  title: 'Landslide',
  type: 'barChart',
  unit: 'km²',
  config: {
    1.0: {
      name: 'Slight',
      fill: '#ffba08'
    },
    2.0: {
      name: 'Slight - Moderate',
      fill: '#f48c06'
    },
    3.0: {
      name: 'Moderate',
      fill: '#e85d04'
    },
    4.0: {
      name: 'Moderate - Severe',
      fill: '#d00000'
    },
    5.0: {
      name: 'Severe',
      fill: '#6a040f'
    }
  }
}

export const landuse = {
  key: 'landuse',
  title: 'Landuse',
  type: 'barChart',
  unit: 'km²',
  config: {
    1.0: {
      name: 'Shrubland',
      fill: '#faefcf'
    },
    2.0: {
      name: 'Herbaceous vegetation',
      fill: '#9e5b2e'
    },
    3.0: {
      name: 'Cropland',
      fill: '#6a3d0b'
    },
    5.0: {
      name: 'Bare / sparse vegetation',
      fill: '#66543b'
    },
    8.0: {
      name: 'Herbaceous wetland',
      fill: '#b6c197'
    },
    9.0: {
      name: 'Moss & lichen',
      fill: '#587055'
    },
    10.0: {
      name: 'Forest',
      fill: '#2d6a4f'
    }
  }
}

export const forest_loss = {
  key: 'forest_loss',
  title: 'Forest loss',
  type: 'barChart',
  unit: 'km²',
  config: {
    1.0: {
      name: '2001 - 2010',
      fill: '#ffdd9e'
    },
    2.0: {
      name: '2011 - 2015',
      fill: '#ffb867'
    },
    3.0: {
      name: '2016 - 2018',
      fill: '#f06923'
    },
    4.0: {
      name: '2019',
      fill: '#0030b8'
    }
  }
}
export const rubber_2020 = {
  key: 'rubber_2020',
  type: 'barChart',
  title: 'Rubber plantations 2020',
  unit: 'km²',
  config: {
    255.0: {
      name: '2020',
      fill: '#a6c39f'
    }
  }
}

export const coastal_flood_risk = {
  key: 'coastal_flood_risk',
  title: 'Coastal Flood',
  type: 'barChart',
  unit: 'km²',
  config: {
    0: {
      name: 'Low',
      fill: '#e3f2fd',
      val: 0
    },
    1: {
      name: 'Low - Medium',
      fill: '#bbdefb',
      val: 0
    },
    2: {
      name: 'Medium - High',
      fill: '#90caf9',
      val: 0
    },
    3: {
      name: 'High',
      fill: '#42a5f5',
      val: 0
    },
    4: {
      name: 'Extremely high',
      fill: '#1976d2',
      val: 0
    }
  }
}

export const riverine_flood_risk = {
  key: 'riverine_flood_risk',
  title: 'Riverine flood',
  type: 'barChart',
  unit: 'km²',
  config: {
    0: {
      name: 'Low',
      fill: '#ebf5fb',
      val: 0
    },
    1: {
      name: 'Low - Medium',
      fill: '#aed6f1',
      val: 0
    },
    2: {
      name: 'Medium - High',
      fill: '#5dade2',
      val: 0
    },
    3: {
      name: 'High',
      fill: '#2e86c1',
      val: 0
    },
    4: {
      name: 'Extremely high',
      fill: '#1b4f72',
      val: 0
    }
  }
}

export const drought_risk = {
  key: 'drought_risk',
  title: 'Drought',
  type: 'barChart',
  unit: 'km²',
  config: {
    1: {
      name: 'Low - Medium',
      fill: '#ff9017',
      val: 0
    },
    2: {
      name: 'Medium',
      fill: '#ff6d00',
      val: 0
    },
    3: {
      name: 'Medium - High',
      fill: '#e86300',
      val: 0
    }
  }
}

export const rubber_annual_price = {
  key: 'rubber_annual_price',
  title: 'Annual rubber price',
  type: 'lineChart',
  unit: 'USD/kg',
  config: {
    2010: { name: '2010', fill: '#2e5bff' },
    2011: { name: '2011', fill: '#2e5bff' },
    2012: { name: '2012', fill: '#2e5bff' },
    2013: { name: '2013', fill: '#2e5bff' },
    2014: { name: '2014', fill: '#2e5bff' },
    2015: { name: '2015', fill: '#2e5bff' },
    2016: { name: '2016', fill: '#2e5bff' },
    2017: { name: '2017', fill: '#2e5bff' },
    2018: { name: '2018', fill: '#2e5bff' },
    2019: { name: '2019', fill: '#2e5bff' },
    2020: { name: '2020', fill: '#2e5bff' }
  }
}

export const export_rubber_natural_dry = {
  key: 'export_rubber_natural_dry',
  title: 'Dry natural rubber export',
  type: 'lineChart',
  unit: 'tonnes',
  hiddeZero: true,
  config: {
    2010: { name: '2010', fill: '#2e5bff' },
    2011: { name: '2011', fill: '#2e5bff' },
    2012: { name: '2012', fill: '#2e5bff' },
    2013: { name: '2013', fill: '#2e5bff' },
    2014: { name: '2014', fill: '#2e5bff' },
    2015: { name: '2015', fill: '#2e5bff' },
    2016: { name: '2016', fill: '#2e5bff' },
    2017: { name: '2017', fill: '#2e5bff' },
    2018: { name: '2018', fill: '#2e5bff' },
    2019: { name: '2019', fill: '#2e5bff' }
  }
}

export const export_rubber_natural = {
  key: 'export_rubber_natural',
  title: 'Natural rubber export',
  type: 'lineChart',
  unit: 'tonnes',
  hiddeZero: true,
  config: {
    2012: { name: '2012', fill: '#2e5bff' },
    2013: { name: '2013', fill: '#2e5bff' },
    2014: { name: '2014', fill: '#2e5bff' },
    2015: { name: '2015', fill: '#2e5bff' },
    2016: { name: '2016', fill: '#2e5bff' },
    2017: { name: '2017', fill: '#2e5bff' },
    2018: { name: '2018', fill: '#2e5bff' },
    2019: { name: '2019', fill: '#2e5bff' }
  }
}

export const import_rubber_natural_dry = {
  key: 'import_rubber_natural_dry',
  title: 'Dry natural rubber import',
  type: 'lineChart',
  unit: 'tonnes',
  hiddeZero: true,
  config: {
    2018: { name: '2018', fill: '#2e5bff' },
    2019: { name: '2019', fill: '#2e5bff' }
  }
}

export const import_rubber_natural = {
  key: 'import_rubber_natural',
  title: 'Natural rubber import',
  type: 'lineChart',
  unit: 'tonnes',
  hiddeZero: true,
  config: {
    2019: { name: '2019', fill: '#2e5bff' }
  }
}

export const corruption_perception_index = {
  key: 'corruption_perception_index',
  title: 'Corruption perception index',
  type: 'lineChart',
  unit: 'scale',
  config: {
    2012: { name: '2012', fill: '#2e5bff' },
    2013: { name: '2013', fill: '#2e5bff' },
    2014: { name: '2014', fill: '#2e5bff' },
    2015: { name: '2015', fill: '#2e5bff' },
    2016: { name: '2016', fill: '#2e5bff' },
    2017: { name: '2017', fill: '#2e5bff' },
    2018: { name: '2018', fill: '#2e5bff' },
    2019: { name: '2019', fill: '#2e5bff' },
    2020: { name: '2020', fill: '#2e5bff' }
  }
}

export const tropical_storm_stats_year_speed = {
  key: 'tropical_storm_stats_year_speed',
  title: 'Tropical storm speed for year',
  type: 'lineChart',
  unit: 'mph',
  hiddeZero: true,
  config: {
    192: { name: "20'", fill: '#2e5bff', val: 0 },
    193: { name: "30'", fill: '#2e5bff', val: 0 },
    194: { name: "40'", fill: '#2e5bff', val: 0 },
    195: { name: "50'", fill: '#2e5bff', val: 0 },
    196: { name: "60'", fill: '#2e5bff', val: 0 },
    197: { name: "70'", fill: '#2e5bff', val: 0 },
    198: { name: "80'", fill: '#2e5bff', val: 0 },
    199: { name: "90'", fill: '#2e5bff', val: 0 },
    200: { name: "20'", fill: '#2e5bff', val: 0 },
    201: { name: "21'", fill: '#2e5bff', val: 0 }
  }
}

export const tropical_storm_stats_year = {
  key: 'tropical_storm_stats_year',
  title: 'Tropical storm for year',
  type: 'lineChart',
  unit: 'units',
  hiddeZero: true,
  config: {
    192: { name: "20'", fill: '#2e5bff', val: 0 },
    193: { name: "30'", fill: '#2e5bff', val: 0 },
    194: { name: "40'", fill: '#2e5bff', val: 0 },
    195: { name: "50'", fill: '#2e5bff', val: 0 },
    196: { name: "60'", fill: '#2e5bff', val: 0 },
    197: { name: "70'", fill: '#2e5bff', val: 0 },
    198: { name: "80'", fill: '#2e5bff', val: 0 },
    199: { name: "90'", fill: '#2e5bff', val: 0 },
    200: { name: "20'", fill: '#2e5bff', val: 0 },
    201: { name: "21'", fill: '#2e5bff', val: 0 }
  }
}

export const tropical_storm_total = {
  key: 'tropical_storm_total',
  title: 'Total tropical storms',
  type: 'numChart',
  unit: 'units',
  hiddeZero: true,
  config: {
    192: { name: "20'", fill: '#2e5bff', val: 0 },
    193: { name: "30'", fill: '#2e5bff', val: 0 },
    194: { name: "40'", fill: '#2e5bff', val: 0 },
    195: { name: "50'", fill: '#2e5bff', val: 0 },
    196: { name: "60'", fill: '#2e5bff', val: 0 },
    197: { name: "70'", fill: '#2e5bff', val: 0 },
    198: { name: "80'", fill: '#2e5bff', val: 0 },
    199: { name: "90'", fill: '#2e5bff', val: 0 },
    200: { name: "20'", fill: '#2e5bff', val: 0 },
    201: { name: "21'", fill: '#2e5bff', val: 0 }
  }
}

export const social_risk_year = {
  key: 'social_risk_year',
  title: 'Social risk for year',
  type: 'lineChart',
  unit: 'units',
  hiddeZero: true,
  config: {
    2010: { name: '2010', fill: '#2e5bff', val: 0 },
    2011: { name: '2011', fill: '#2e5bff', val: 0 },
    2012: { name: '2012', fill: '#2e5bff', val: 0 },
    2013: { name: '2013', fill: '#2e5bff', val: 0 },
    2014: { name: '2014', fill: '#2e5bff', val: 0 },
    2015: { name: '2015', fill: '#2e5bff', val: 0 },
    2016: { name: '2016', fill: '#2e5bff', val: 0 },
    2017: { name: '2017', fill: '#2e5bff', val: 0 },
    2018: { name: '2018', fill: '#2e5bff', val: 0 },
    2019: { name: '2019', fill: '#2e5bff', val: 0 },
    2020: { name: '2020', fill: '#2e5bff', val: 0 }
  }
}

export const social_risk_total = {
  key: 'social_risk_total',
  title: 'Total social risk',
  type: 'numChart',
  unit: 'units',
  hiddeZero: true,
  config: {
    2010: { name: '2010', fill: '#2e5bff', val: 0 },
    2011: { name: '2011', fill: '#2e5bff', val: 0 },
    2012: { name: '2012', fill: '#2e5bff', val: 0 },
    2013: { name: '2013', fill: '#2e5bff', val: 0 },
    2014: { name: '2014', fill: '#2e5bff', val: 0 },
    2015: { name: '2015', fill: '#2e5bff', val: 0 },
    2016: { name: '2016', fill: '#2e5bff', val: 0 },
    2017: { name: '2017', fill: '#2e5bff', val: 0 },
    2018: { name: '2018', fill: '#2e5bff', val: 0 },
    2019: { name: '2019', fill: '#2e5bff', val: 0 },
    2020: { name: '2020', fill: '#2e5bff', val: 0 }
  }
}

export const social_risk_event_type = {
  key: 'social_risk_event_type',
  title: 'Social risk type',
  type: 'lineChart',
  unit: 'units',
  hiddeZero: true,
  config: {
    protests: {
      name: 'protests',
      fill: '#2e5bff',
      val: 0
    },
    violence_against_civilians: {
      name: 'violence against civilians',
      fill: '#2e5bff',
      val: 0
    },
    riots: {
      name: 'riots',
      fill: '#2e5bff',
      val: 0
    },
    battles: {
      name: 'battles',
      fill: '#2e5bff',
      val: 0
    },
    strategic_developments: {
      name: 'strategic developments',
      fill: '#2e5bff',
      val: 0
    },
    'explosions/remote_violence': {
      name: 'explosions/remote violence',
      fill: '#2e5bff',
      val: 0
    }
  }
}

export const rubber_least_profitable_price = {
  key: 'rubber_least_profitable_price',
  title: 'Rubber least profitable price',
  type: 'numChart',
  unit: 'USD/kg'
}
