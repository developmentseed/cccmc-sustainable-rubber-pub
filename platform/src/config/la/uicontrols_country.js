import { AdminBoundaries, EconAct } from '../../icons'
import uicontrols_environmental_risks from './uicontrols_environmental_risks'
import uicontrols_economic_risks from './uicontrols_economic_risks'
import uicontrols_rubber_plantations from './uicontrols_rubber_plantations'
import uicontrols_social_risks from './uicontrols_social_risks'

export default [
  {
    id: 'la_country_admin_level_menu',
    label: 'Admin Level country',
    icon: AdminBoundaries,
    description: '',
    info: 'country',
    dataLayer: true,
    // Layer, for diaply this layer with switch button we need to add
    // toggleButton = true, it eill take the first object in control
    toggleButton: true,
    menuVisibility: 'hidden',
    controls: [
      {
        id: 'ctrl_country_layer_la',
        label: 'country la',
        defaultVisibility: true,
        legend: 'none',
        layerIds: ['country_layer_la', 'country_layer_la_highlight'],
        info: 'country'
      }
    ]
  },
  {
    id: 'la_country_rubber_plantations',
    label: 'Natural rubber',
    icon: EconAct,
    description: '',
    info: 'Rubber plantations LA - country',
    // Layer
    defaultVisibility: true,
    legend: 'none',
    layerIds: [],
    controls: [
      // Get all rubbers plantation layers
      ...uicontrols_rubber_plantations,
      //  Natural rubber export
      {
        id: 'ctrl_country_natural_rubber_export_la_layer',
        label: 'Natural rubber export',
        defaultVisibility: false,
        legend: 'none',
        layerIds: [],
        chartsIds: ['export_rubber_natural'],
        info: 'Natural rubber export'
      },
      //  Dry natural rubber export
      {
        id: 'ctrl_country_dry_natural_rubber_export_la_layer',
        label: 'Dry natural rubber export',
        defaultVisibility: false,
        legend: 'none',
        layerIds: [],
        chartsIds: ['export_rubber_natural_dry'],
        info: 'Dry natural rubber export'
      },
      //  Annual rubber price
      {
        id: 'ctrl_country_annual_rubber_price_la_layer',
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
    id: 'la_country_social_risks',
    label: 'Social risks',
    icon: EconAct,
    description: '',
    info: 'Social risks LA - country',
    // Layer
    defaultVisibility: true,
    legend: 'none',
    layerIds: [],
    controls: [
      //  Social conflicts
      {
        id: 'ctrl_social_conflicts_la_layer',
        label: 'Social conflicts',
        defaultVisibility: false,
        legend: 'none',
        legendMap: [
          {
            value: 'No incidents',
            color: '#f8f9f9'
          },
          {
            value: '1 - 3',
            color: '#eed7e1'
          },
          {
            value: '3 - 8',
            color: '#c99bb0'
          },
          {
            value: '8 - 12',
            color: '#a45f7f'
          },
          {
            value: 'Over 12',
            color: '#78194f'
          }
        ],
        layerIds: ['social_risk_total_la'],
        chartsIds: ['social_risk_year', 'social_risk_event_type'],
        info: 'Social conflicts'
      },
      /**
       *  Labor availability for country , it will display the numcharts
       * This layer does not have any map layer
       * */
      {
        id: 'ctrl_agepop_2010_stat_la_layer',
        label: 'Labor availability',
        defaultVisibility: true,
        legend: 'none',
        legendMap: [
          {
            value: 'Less than 15,023',
            color: '#eab8a2'
          },
          {
            value: '15,023 - 30,334',
            color: '#d69f7e'
          },
          {
            value: '30,334 - 65,410',
            color: '#c38e70'
          },
          {
            value: '65,410 - 106,425',
            color: '#9d6b53'
          },
          {
            value: 'Over 106,425',
            color: '#774936'
          }
        ],
        layerIds: ['agepop_2010_stat_la'],
        chartsIds: ['agepop_2010'],
        info: 'Labor availability'
      },

      // Landuse
      ...uicontrols_social_risks,

      //  Corruption perception index
      {
        id: 'ctrl_country_corruption_perception_index_la_layer',
        label: 'Corruption perception index',
        defaultVisibility: false,
        legend: 'none',
        layerIds: [],
        chartsIds: ['corruption_perception_index'],
        info: 'Corruption index'
      }
    ]
  },
  {
    id: 'la_country_environmental_risks',
    label: 'Environmental risks',
    icon: EconAct,
    description: '',
    info: 'country',
    controls: [
      ...uicontrols_environmental_risks,

      // Tropical storm graphs
      {
        id: 'ctrl_tropical_storm_risk_la',
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
        layerIds: ['tropical_storm_total_la'],
        chartsIds: ['tropical_storm_stats_year_speed', 'tropical_storm_stats_year'],
        info: 'Tropical storm'
      }
    ]
  },
  {
    id: 'la_country_economic_risks',
    label: 'Economic risks',
    icon: AdminBoundaries,
    description: '',
    info: 'country',
    controls: [
      {
        id: 'ctrl_rubber_least_profitable_price_la',
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
        layerIds: ['rubber_least_profitable_price_la'],
        chartsIds: ['rubber_least_profitable_price'],
        info: 'Rubber least profitable price'
      },
      ...uicontrols_economic_risks
    ]
  }
]
