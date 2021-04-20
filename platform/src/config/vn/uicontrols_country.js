import { AdminBoundaries, EconAct } from '../../icons'
import uicontrols_environmental_risks from './uicontrols_environmental_risks'
import uicontrols_economic_risks from './uicontrols_economic_risks'
import uicontrols_rubber_plantations from './uicontrols_rubber_plantations'
import uicontrols_social_risks from './uicontrols_social_risks'

export default [
  {
    id: 'vn_country_admin_level_menu',
    label: 'Admin Level country',
    icon: AdminBoundaries,
    description: '',
    info: 'country',
    dataLayer: true,
    toggleButton: true,
    menuVisibility: 'hidden',
    controls: [
      {
        id: 'ctrl_country_layer_vn',
        label: 'country vn',
        defaultVisibility: true,
        legend: 'none',
        layerIds: ['country_layer_vn', 'country_layer_vn_highlight'],
        info: 'country'
      }
    ]
  },
  {
    id: 'vn_country_rubber_plantations',
    label: 'Natural rubber',
    icon: EconAct,
    description: '',
    info: 'Rubber plantations VN - country',
    // Layer
    defaultVisibility: true,
    legend: 'none',
    layerIds: [],
    controls: [
      // Rubber plantations
      ...uicontrols_rubber_plantations,
      //  Natural rubber export
      {
        id: 'ctrl_country_natural_rubber_export_vn_layer',
        label: 'Natural rubber export',
        defaultVisibility: false,
        legend: 'none',
        layerIds: [],
        chartsIds: ['export_rubber_natural'],
        info: 'Natural rubber export'
      },
      //  Dry natural rubber export
      {
        id: 'ctrl_country_dry_natural_rubber_export_vn_layer',
        label: 'Dry natural rubber export',
        defaultVisibility: false,
        legend: 'none',
        layerIds: [],
        chartsIds: ['export_rubber_natural_dry'],
        info: 'Dry natural rubber export'
      },
      //  Natural rubber import
      {
        id: 'ctrl_country_natural_rubber_import_vn_layer',
        label: 'Natural rubber import',
        defaultVisibility: false,
        legend: 'none',
        layerIds: [],
        chartsIds: ['import_rubber_natural'],
        info: 'Natural rubber import'
      },
      //  Dry natural rubber import
      {
        id: 'ctrl_country_dry_natural_rubber_import_vn_layer',
        label: 'Dry natural rubber import',
        defaultVisibility: false,
        legend: 'none',
        layerIds: [],
        chartsIds: ['import_rubber_natural_dry'],
        info: 'Dry natural rubber import'
      },
      //  Annual rubber price
      {
        id: 'ctrl_country_annual_rubber_price_vn_layer',
        label: 'Annual rubber price',
        defaultVisibility: false,
        legend: 'none',
        layerIds: [],
        chartsIds: ['rubber_annual_price'],
        info: 'Annual rubber price'
      }
    ]
  },
  {
    id: 'vn_country_social_risks',
    label: 'Social risks',
    icon: EconAct,
    description: '',
    info: 'Social risks VN - country',
    // Layer
    defaultVisibility: true,
    legend: 'none',
    layerIds: [],
    controls: [
      //  Social conflicts
      {
        id: 'ctrl_social_conflicts_vn_layer',
        label: 'Social conflicts',
        defaultVisibility: false,
        legend: 'none',
        legendMap: [
          {
            value: 'No incidents',
            color: '#f8f9f9'
          },
          {
            value: '1 - 5',
            color: '#eed7e1'
          },
          {
            value: '5 - 10',
            color: '#c99bb0'
          },
          {
            value: '10 - 15',
            color: '#a45f7f'
          },
          {
            value: 'Over 15',
            color: '#78194f'
          }
        ],
        layerIds: ['social_risk_total_vn'],
        chartsIds: ['social_risk_year', 'social_risk_event_type'],
        info: 'Social conflicts'
      },
      //  Labor availability
      {
        id: 'ctrl_agepop_2010_stat_vn_layer',
        label: 'Labor availability',
        defaultVisibility: false,
        legend: 'none',
        legendMap: [
          {
            value: 'No data',
            color: '#f8f9f9'
          },
          {
            value: 'Less than 15,082',
            color: '#eab8a2'
          },
          {
            value: '15,082 - 30,323',
            color: '#d69f7e'
          },
          {
            value: '30,323 - 60,049',
            color: '#c38e70'
          },
          {
            value: '60,049 - 100,933',
            color: '#9d6b53'
          },
          {
            value: 'Over 100,933',
            color: '#774936'
          }
        ],
        layerIds: ['agepop_2010_stat_vn'],
        chartsIds: ['agepop_2010'],
        info: 'Labor availability'
      },
      // Landuse
      ...uicontrols_social_risks,
      //  Corruption perception index
      {
        id: 'ctrl_country_corruption_perception_index_vn_layer',
        label: 'Corruption perception index',
        defaultVisibility: false,
        legend: 'none',
        layerIds: ['corruption_perception_index_vn_layer'],
        chartsIds: ['corruption_perception_index'],
        info: 'Corruption perception index'
      }
    ]
  },
  {
    id: 'vn_country_environmental_risks',
    label: 'Environmental risks',
    icon: AdminBoundaries,
    description: '',
    info: 'country',
    controls: [
      ...uicontrols_environmental_risks,
      // Tropical storm graphs
      {
        id: 'ctrl_tropical_storm_risk_vn',
        label: 'Tropical storm',
        defaultVisibility: false,
        legend: 'none',
        legendMap: [
          {
            value: 'No incidents',
            color: '#f8f9f9'
          },
          {
            value: '1 - 7',
            color: '#fad9d6'
          },
          {
            value: '7 - 14',
            color: '#ec7265'
          },
          {
            value: 'Over 14',
            color: '#912a21'
          }
        ],
        layerIds: ['tropical_storm_total_vn'],
        chartsIds: ['tropical_storm_stats_year_speed', 'tropical_storm_stats_year'],
        info: 'Tropical storm'
      }
    ]
  },
  {
    id: 'vn_country_economic_risks',
    label: 'Economic risks',
    icon: AdminBoundaries,
    description: '',
    info: 'country',
    controls: [
      {
        id: 'ctrl_rubber_least_profitable_price_vn',
        label: 'Rubber least profitable price',
        defaultVisibility: true,
        legend: 'none',
        legendMap: [
          {
            value: 'No data',
            color: '#f8f9f9'
          },
          {
            value: 'Less than 0.50',
            color: '#eeecf4'
          },
          {
            value: '0.50 - 1.00',
            color: '#cfc4e0'
          },
          {
            value: '1.00 - 2.00',
            color: '#b09dcc'
          },
          {
            value: '2.00 - 4.00',
            color: '#9275b8'
          },
          {
            value: '4.00 - 15.00',
            color: '#734ea4'
          },
          {
            value: 'Over 15.00',
            color: '#552790'
          }
        ],
        layerIds: ['rubber_least_profitable_price_vn'],
        chartsIds: ['rubber_least_profitable_price'],
        info: 'Rubber least profitable price'
      },
      ...uicontrols_economic_risks
    ]
  }
]
