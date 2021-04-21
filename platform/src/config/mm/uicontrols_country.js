import { AdminBoundaries, EconAct } from '../../icons'
import uicontrols_environmental_risks from './uicontrols_environmental_risks'
import uicontrols_economic_risks from './uicontrols_economic_risks'
import uicontrols_rubber_plantations from './uicontrols_rubber_plantations'
import uicontrols_social_risks from './uicontrols_social_risks'

export default [
  {
    id: 'mm_country_admin_level_menu',
    label: 'Admin Level country',
    icon: AdminBoundaries,
    description: '',
    info: 'country',
    dataLayer: true,
    toggleButton: true,
    menuVisibility: 'hidden',
    controls: [
      {
        id: 'ctrl_country_layer_mm',
        label: 'country mm',
        defaultVisibility: true,
        legend: 'none',
        layerIds: ['country_layer_mm', 'country_layer_mm_highlight'],
        info: 'country'
      }
    ]
  },
  {
    id: 'mm_country_rubber_plantations',
    label: 'Natural rubber',
    icon: EconAct,
    description: '',
    info: 'Rubber plantations MM - country',
    // Layer
    defaultVisibility: true,
    legend: 'none',
    layerIds: [],
    controls: [
      // Rubber plantations
      ...uicontrols_rubber_plantations,
      //  Natural rubber export
      {
        id: 'ctrl_country_natural_rubber_export_mm_layer',
        label: 'Natural rubber export',
        defaultVisibility: false,
        legend: 'none',
        layerIds: [],
        chartsIds: ['export_rubber_natural'],
        info: 'Natural rubber export'
      },
      //  Dry natural rubber export
      {
        id: 'ctrl_country_dry_natural_rubber_export_mm_layer',
        label: 'Dry natural rubber export',
        defaultVisibility: false,
        legend: 'none',
        layerIds: [],
        chartsIds: ['export_rubber_natural_dry'],
        info: 'Dry natural rubber export'
      },
      //  Annual rubber price
      {
        id: 'ctrl_country_annual_rubber_price_mm_layer',
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
    id: 'mm_country_social_risks',
    label: 'Social risks',
    icon: EconAct,
    description: '',
    info: 'Social risks MM - country',
    // Layer
    defaultVisibility: false,
    legend: 'none',
    layerIds: [],
    controls: [
      //  Social conflicts
      {
        id: 'ctrl_social_conflicts_mm_layer',
        label: 'Social conflicts',
        defaultVisibility: false,
        legend: 'none',
        legendMap: [
          {
            value: '1 - 114',
            color: '#eed7e1'
          },
          {
            value: '114 - 562',
            color: '#c99bb0'
          },
          {
            value: '562 - 1,212',
            color: '#a45f7f'
          },
          {
            value: 'Over 1,212',
            color: '#78194f'
          }
        ],
        layerIds: ['social_risk_total_mm'],
        chartsIds: ['social_risk_year', 'social_risk_event_type'],
        info: 'Social conflicts'
      },
      //  Labor availability
      {
        id: 'ctrl_agepop_2010_stat_mm_layer',
        label: 'Labor availability',
        defaultVisibility: true,
        legend: 'none',
        legendMap: [
          {
            value: 'Less than 144,201',
            color: '#eab8a2'
          },
          {
            value: '144,201 - 307,623',
            color: '#d69f7e'
          },
          {
            value: '307,623 - 621,810',
            color: '#c38e70'
          },
          {
            value: '621,810 - 1,002,498',
            color: '#9d6b53'
          },
          {
            value: 'Over 1,002,498',
            color: '#774936'
          }
        ],
        layerIds: ['agepop_2010_stat_mm'],
        chartsIds: ['agepop_2010'],
        info: 'Labor availability'
      },
      // Landuse
      ...uicontrols_social_risks,
      //  Corruption perception index
      {
        id: 'ctrl_country_corruption_perception_index_mm_layer',
        label: 'Corruption perception index',
        defaultVisibility: false,
        legend: 'none',
        layerIds: [],
        chartsIds: ['corruption_perception_index'],
        info: 'Corruption perception index'
      }
    ]
  },
  {
    id: 'mm_country_environmental_risks',
    label: 'Environmental risks',
    icon: AdminBoundaries,
    description: '',
    info: 'country',
    controls: [
      ...uicontrols_environmental_risks,
      // Tropical storm graphs
      {
        id: 'ctrl_tropical_storm_risk_mm',
        label: 'Tropical storm',
        defaultVisibility: false,
        legend: 'none',
        legendMap: [
          {
            value: 'No incidents',
            color: '#f8f9f9'
          },
          {
            value: '1 - 4',
            color: '#fad9d6'
          },
          {
            value: '4 - 8',
            color: '#ec7265'
          },
          {
            value: 'Over 8',
            color: '#912a21'
          }
        ],
        layerIds: ['tropical_storm_total_mm'],
        chartsIds: [
          'tropical_storm_stats_year_speed',
          'tropical_storm_stats_year'
        ],
        info: 'Tropical storm'
      }
    ]
  },
  {
    id: 'mm_country_economic_risks',
    label: 'Economic risks',
    icon: AdminBoundaries,
    description: '',
    info: 'country',
    controls: [
      {
        id: 'ctrl_rubber_least_profitable_price_mm',
        label: 'Rubber least profitable price',
        defaultVisibility: true,
        legend: 'none',
        legendMap: [
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
        layerIds: ['rubber_least_profitable_price_mm'],
        chartsIds: ['rubber_least_profitable_price'],
        info: 'Rubber least profitable price'
      },
      ...uicontrols_economic_risks
    ]
  }
]
