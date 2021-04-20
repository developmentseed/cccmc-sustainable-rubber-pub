import polygon_layer from './../../utils/polygon_layer'
import raster_layer from './../../utils/raster_layer'
import highlight_layer from './../../utils/highlight_layer'
import theme from './../theme'

import {
  tiger_conservation_area,
  protected_area,
  agepop_2010,
  market_acc_stat,
  rubber_2020,
  rubber_annual_price,
  export_rubber_natural,
  export_rubber_natural_dry,
  import_rubber_natural,
  import_rubber_natural_dry,
  landuse,
  forest_loss,
  landslide_risk,
  coastal_flood_risk,
  riverine_flood_risk,
  drought_risk,
  tropical_storm_stats_year_speed,
  tropical_storm_stats_year,
  tropical_storm_total,
  social_risk_year,
  social_risk_event_type,
  social_risk_total,
  rubber_least_profitable_price,
  corruption_perception_index
} from './../stats'

/**
 * See: https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/
 * Base on: https://docs.mapbox.com/help/tutorials/make-a-heatmap-with-mapbox-gl-js/
 */

let layers = [
  polygon_layer({
    id_layer: 'country_layer_vn',
    source: 'country_source',
    source_layer: 'country_vn',
    eval_property: 'none',
    color: theme.color_layers.boundary,
    outline: theme.color_layers.outline,
    before: 'road-label',
    attributes: [
      agepop_2010,
      protected_area,
      tiger_conservation_area,
      rubber_2020,
      export_rubber_natural,
      export_rubber_natural_dry,
      import_rubber_natural,
      import_rubber_natural_dry,
      rubber_annual_price,
      social_risk_year,
      social_risk_event_type,
      landuse,
      corruption_perception_index,
      forest_loss,
      landslide_risk,
      coastal_flood_risk,
      riverine_flood_risk,
      drought_risk,
      tropical_storm_stats_year_speed,
      tropical_storm_stats_year,
      rubber_least_profitable_price,
      market_acc_stat
    ]
  }),

  highlight_layer({
    id_layer: 'country_layer_vn_highlight',
    source: 'country_source',
    source_layer: 'country_vn',
    eval_property: 'none',
    color: theme.color_layers.highlight,
    before: 'road-label',
    filter: ['in', 'shapeID', ''],
    attributes: []
  }),

  polygon_layer({
    id_layer: 'province_layer_vn',
    source: 'province_source',
    source_layer: 'province_vn',
    eval_property: 'none',
    color: theme.color_layers.boundary,
    outline: theme.color_layers.outline,
    before: 'road-label',
    attributes: [
      agepop_2010,
      protected_area,
      tiger_conservation_area,
      rubber_2020,
      social_risk_year,
      social_risk_event_type,
      landuse,
      forest_loss,
      landslide_risk,
      coastal_flood_risk,
      riverine_flood_risk,
      drought_risk,
      tropical_storm_stats_year_speed,
      tropical_storm_stats_year,
      rubber_least_profitable_price,
      market_acc_stat
    ]
  }),

  highlight_layer({
    id_layer: 'province_layer_vn_highlight',
    source: 'province_source',
    source_layer: 'province_vn',
    eval_property: 'none',
    color: theme.color_layers.highlight,
    before: 'road-label',
    filter: ['in', 'shapeID', ''],
    attributes: []
  }),

  polygon_layer({
    id_layer: 'county_layer_vn',
    source: 'county_source',
    source_layer: 'county_vn',
    eval_property: 'none',
    color: theme.color_layers.boundary,
    outline: theme.color_layers.outline,
    before: 'road-label',
    attributes: [
      agepop_2010,
      protected_area,
      tiger_conservation_area,
      rubber_2020,
      social_risk_total,
      social_risk_event_type,
      landuse,
      forest_loss,
      landslide_risk,
      coastal_flood_risk,
      riverine_flood_risk,
      drought_risk,
      tropical_storm_total,
      tropical_storm_stats_year_speed,
      rubber_least_profitable_price,
      market_acc_stat
    ]
  }),

  highlight_layer({
    id_layer: 'county_layer_vn_highlight',
    source: 'county_source',
    source_layer: 'county_vn',
    eval_property: 'none',
    color: theme.color_layers.highlight,
    before: 'road-label',
    filter: ['in', 'shapeID', ''],
    attributes: []
  }),

  polygon_layer({
    id_layer: 'coastal_flood_risk_vn',
    source: 'base_source',
    source_layer: 'coastal_flood_risk_vn',
    eval_property: 'none',
    color: [
      'match',
      ['get', 'cfr_cat'],
      [0],
      '#e3f2fd',
      [1],
      '#bbdefb',
      [2],
      '#90caf9',
      [3],
      '#42a5f5',
      [4],
      '#1976d2',
      '#f8f9f9'
    ],
    before: 'road-label',
    attributes: []
  }),

  polygon_layer({
    id_layer: 'riverine_flood_risk_vn',
    source: 'base_source',
    source_layer: 'riverine_flood_risk_vn',
    eval_property: 'none',
    color: [
      'match',
      ['get', 'rfr_cat'],
      [0],
      '#ebf5fb',
      [1],
      '#aed6f1',
      [2],
      '#5dade2',
      [3],
      '#2e86c1',
      [4],
      '#1b4f72',
      '#f8f9f9'
    ],
    before: 'road-label',
    attributes: []
  }),

  polygon_layer({
    id_layer: 'drought_risk_vn',
    source: 'base_source',
    source_layer: 'drought_risk_vn',
    eval_property: 'none',
    color: [
      'match',
      ['get', 'drr_cat'],
      [1],
      'rgba(255, 144, 23, 1)',
      [2],
      'rgba(255, 109, 0, 1)',
      [3],
      'rgba(232, 99, 0, 1)',
      'rgba(248, 249, 249, 1)'
    ],
    before: 'road-label',
    attributes: []
  }),

  polygon_layer({
    id_layer: 'tiger_conservation_landscapes_vn',
    source: 'base_source',
    source_layer: 'tiger_conservation_landscapes_vn',
    eval_property: 'none',
    color: 'rgba(151, 216, 196, 1)',
    before: 'road-label',
    attributes: []
  }),

  polygon_layer({
    id_layer: 'protected_areas_vn',
    source: 'base_source',
    source_layer: 'protected_areas_vn',
    eval_property: 'none',
    color: 'rgba(95, 84, 73, 1)',
    before: 'road-label',
    attributes: []
  }),

  polygon_layer({
    id_layer: 'agepop_2010_stat_vn',
    source: 'base_source',
    source_layer: 'agepop_2010_stat_vn',
    eval_property: 'none',
    color: [
      'step',
      [
        'get',
        'agepop_2010_stat_cat'
      ],
      'rgba(248, 249, 249, 1)',
      1,
      'rgba(234, 184, 162, 1)',
      2,
      'rgba(214, 159, 126, 1)',
      3,
      'rgba(195, 142, 112, 1)',
      4,
      'rgba(157, 107, 83, 1)',
      5,
      'rgba(119, 73, 54, 1)'
    ],
    before: 'road-label',
    attributes: []
  }),

  /**
   * Layer labor avalibility for province
   */
  polygon_layer({
    id_layer: 'agepop_2010_adm1_vn',
    source: 'base_source',
    source_layer: 'agepop_2010_adm1_vn',
    eval_property: 'none',
    color: [
      'case',
      ['<', ['get', 'agepop_2010'], 507329],
      '#eab8a2',
      ['<', ['get', 'agepop_2010'], 823888],
      '#d69f7e',
      ['<', ['get', 'agepop_2010'], 1040577],
      '#c38e70',
      ['<', ['get', 'agepop_2010'], 1878140],
      '#9d6b53',
      ['>=', ['get', 'agepop_2010'], 1878140],
      '#774936',
      '#000000'
    ],
    before: 'road-label',
    attributes: []
  }),

  /**
   * Layer total social risk for county
   */
  polygon_layer({
    id_layer: 'social_risk_total_vn',
    source: 'base_source',
    source_layer: 'social_risk_total_vn',
    eval_property: 'none',
    color: [
      'step',
      [
        'get',
        'social_risk_total_cat'
      ],
      'rgba(248, 249, 249, 1)',
      1,
      'rgba(238, 215, 225, 1)',
      2,
      'rgba(201, 155, 176, 1)',
      3,
      'rgba(164, 95, 127, 1)',
      4,
      'rgba(120, 25, 79, 1)'
    ],
    before: 'road-label',
    attributes: []
  }),

  /**
   * Layer total social risk for province
   */
  polygon_layer({
    id_layer: 'social_risk_total_adm1_vn',
    source: 'base_source',
    source_layer: 'social_risk_total_adm1_vn',
    eval_property: 'none',
    color: [
      'step',
      [
        'get',
        'social_risk_total_cat'
      ],
      'rgba(248, 249, 249, 1)',
      1,
      'rgba(238, 215, 225, 1)',
      2,
      'rgba(201, 155, 176, 1)',
      3,
      'rgba(164, 95, 127, 1)',
      4,
      'rgba(120, 25, 79, 1)'
    ],
    before: 'road-label',
    attributes: []
  }),

  /**
   * Layer total tropical storm for county
   */
  polygon_layer({
    id_layer: 'tropical_storm_total_vn',
    source: 'base_source',
    source_layer: 'tropical_storm_total_vn',
    eval_property: 'none',
    color: [
      'step',
      [
        'get',
        'tropical_storm_total_cat'
      ],
      'rgba(248, 249, 249, 1)',
      1,
      'rgba(250, 217, 214, 1)',
      2,
      'rgba(236, 114, 101, 1)',
      3,
      'rgba(145, 42, 33, 1)'
    ],
    before: 'road-label',
    attributes: []
  }),

  /**
   * Layer total tropical storm for province
   */
  polygon_layer({
    id_layer: 'tropical_storm_total_adm1_vn',
    source: 'base_source',
    source_layer: 'tropical_storm_total_adm1_vn',
    eval_property: 'none',
    color: [
      'case',
      ['<', ['get', 'tropical_storm_total'], 15],
      '#fad9d6',
      ['<', ['get', 'tropical_storm_total'], 30],
      '#ec7265',
      ['>=', ['get', 'tropical_storm_total'], 30],
      '#912a21',
      '#000000'
    ],
    before: 'road-label',
    attributes: []
  }),

  /**
   * Layer rubber least profitable price for county
   */
  polygon_layer({
    id_layer: 'rubber_least_profitable_price_vn',
    source: 'base_source',
    source_layer: 'least_profitable_price_vn',
    eval_property: 'none',
    color: [
      'case',
      [ 'match', ['get', 'rubber_2020'], ['{}', '{"255.0":0}'], true, false ],
      '#f8f9f9',
      [ '<', [ 'get', 'rubber_least_profitable_price'], 0.50],
      '#eeecf4',
      [ '<', [ 'get', 'rubber_least_profitable_price'], 1.00],
      '#cfc4e0',
      [ '<', [ 'get', 'rubber_least_profitable_price'], 2.00],
      '#b09dcc',
      [ '<', [ 'get', 'rubber_least_profitable_price'], 4.00],
      '#9275b8',
      [ '<', [ 'get', 'rubber_least_profitable_price'], 15.00],
      '#734ea4',
      [ '>=', [ 'get', 'rubber_least_profitable_price'], 15.00],
      '#552790',
      '#000000'
    ],
    before: 'road-label',
    attributes: []
  }),

  /**
   * Layer rubber least profitable price for province
   */
  polygon_layer({
    id_layer: 'rubber_least_profitable_price_admin1_vn',
    source: 'base_source',
    source_layer: 'least_profitable_price_adm1_vn',
    eval_property: 'none',
    color: [
      'case',
      [ 'match', ['get', 'rubber_2020'], ['{}', '{"255.0":0}'], true, false ],
      '#f8f9f9',
      [ '<', [ 'get', 'rubber_least_profitable_price'], 0.50],
      '#eeecf4',
      [ '<', [ 'get', 'rubber_least_profitable_price'], 1.00],
      '#cfc4e0',
      [ '<', [ 'get', 'rubber_least_profitable_price'], 2.00],
      '#b09dcc',
      [ '<', [ 'get', 'rubber_least_profitable_price'], 4.00],
      '#9275b8',
      [ '<', [ 'get', 'rubber_least_profitable_price'], 15.00],
      '#734ea4',
      [ '>=', [ 'get', 'rubber_least_profitable_price'], 15.00],
      '#552790',
      '#000000'
    ],
    before: 'road-label',
    attributes: []
  }),

  /// /////////////////////////////////
  // Raster layers
  /// ////////////////////////////////
  // Landslide
  raster_layer({
    id_layer: 'landslide_risk_vn_layer',
    source: 'landslide_risk_vn_source',
    raster_opacity: 0.8
  }),

  // landuse raster
  raster_layer({
    id_layer: 'landuse_vn_layer',
    source: 'landuse_vn_source',
    raster_opacity: 0.8
  }),

  // Forest Loss
  raster_layer({
    id_layer: 'forest_loss_vn_layer',
    source: 'forest_loss_vn_source',
    raster_opacity: 1
  }),

  // Market accessibility
  raster_layer({
    id_layer: 'market_accessibility_vn_layer',
    source: 'market_accessibility_vn_source',
    raster_opacity: 1
  }),

  // Rubber plantation 2020
  raster_layer({
    id_layer: 'rubber_plantations_2020_vn_layer',
    source: 'rubber_plantations_2020_vn_source',
    raster_opacity: 1
  })
]

export default layers
