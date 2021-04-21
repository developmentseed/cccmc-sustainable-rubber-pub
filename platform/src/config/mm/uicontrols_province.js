import { AdminBoundaries, EconAct } from '../../icons'
import uicontrols_rubber_plantations from './uicontrols_rubber_plantations'
import uicontrols_social_risks from './uicontrols_social_risks'
import uicontrols_environmental_risks from './uicontrols_environmental_risks'
import uicontrols_economic_risks from './uicontrols_economic_risks'

export default [
  {
    id: 'mm_province_admin_level_menu',
    label: 'Admin Level province',
    icon: AdminBoundaries,
    description: '',
    info: 'province',
    dataLayer: true,
    toggleButton: true,
    menuVisibility: 'hidden',
    controls: [
      {
        id: 'ctrl_province_layer_mm',
        label: 'province mm',
        defaultVisibility: true,
        legend: 'none',
        layerIds: ['province_layer_mm', 'province_layer_mm_highlight'],
        info: 'province'
      }
    ]
  },
  {
    id: 'mm_province_rubber_plantations',
    label: 'Natural rubber',
    icon: EconAct,
    description: '',
    info: 'province',
    controls: uicontrols_rubber_plantations
  },
  {
    id: 'mm_province_social_risks',
    label: 'Social risks',
    icon: AdminBoundaries,
    description: '',
    info: 'province',
    controls: [
      //  Social conflicts
      {
        id: 'ctrl_social_risk_total_adm1_mm',
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
        layerIds: ['social_risk_total_adm1_mm'],
        chartsIds: ['social_risk_year', 'social_risk_event_type'],
        info: 'Social conflicts'
      },
      // labor availability
      {
        id: 'ctrl_agepop_2010_adm1_mm',
        label: 'Labor availability',
        defaultVisibility: true,
        legend: 'none',
        legendMap: [
          {
            value: 'Less than 990,739',
            color: '#eab8a2'
          },
          {
            value: '990,739 - 1,441,177',
            color: '#d69f7e'
          },
          {
            value: '1,441,177 - 2,619,819',
            color: '#c38e70'
          },
          {
            value: '2,619,819 - 4,206,538',
            color: '#9d6b53'
          },
          {
            value: 'Over 4,206,538',
            color: '#774936'
          }
        ],
        layerIds: ['agepop_2010_adm1_mm'],
        chartsIds: ['agepop_2010'],
        info: 'Labor availability'
      },
      // Landuse
      ...uicontrols_social_risks
    ]
  },
  {
    id: 'mm_province_environmental_risks',
    label: 'Environmental risks',
    icon: AdminBoundaries,
    description: '',
    info: 'province',
    controls: [
      ...uicontrols_environmental_risks,
      // Tropical storm
      {
        id: 'ctrl_tropical_storm_total_adm1_mm',
        label: 'Tropical storm',
        defaultVisibility: false,
        legend: 'none',
        legendMap: [
          {
            value: 'No incidents',
            color: '#f8f9f9'
          },
          {
            value: '1 - 6',
            color: '#fad9d6'
          },
          {
            value: '6 - 15',
            color: '#ec7265'
          },
          {
            value: 'Over 15',
            color: '#912a21'
          }
        ],
        layerIds: ['tropical_storm_total_adm1_mm'],
        chartsIds: [
          'tropical_storm_stats_year_speed',
          'tropical_storm_stats_year'
        ],
        info: 'Tropical storm'
      }
    ]
  },
  {
    id: 'mm_province_economic_risks',
    label: 'Economic risks',
    icon: AdminBoundaries,
    description: '',
    info: 'province',
    controls: [
      {
        id: 'ctrl_rubber_least_profitable_price_admin1_mm',
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
        layerIds: ['rubber_least_profitable_price_admin1_mm'],
        chartsIds: ['rubber_least_profitable_price'],
        info: 'Rubber least profitable price'
      },
      ...uicontrols_economic_risks
    ]
  }
]
