import { AdminBoundaries, EconAct } from '../../icons'
import uicontrols_rubber_plantations from './uicontrols_rubber_plantations'
import uicontrols_social_risks from './uicontrols_social_risks'
import uicontrols_environmental_risks from './uicontrols_environmental_risks'
import uicontrols_economic_risks from './uicontrols_economic_risks'

export default [
  {
    id: 'la_county_admin_level_menu',
    label: 'Admin Level county',
    icon: AdminBoundaries,
    description: '',
    info: 'county',
    dataLayer: true,
    toggleButton: true,
    menuVisibility: 'hidden',
    controls: [
      {
        id: 'ctrl_county_layer_la',
        label: 'county la',
        defaultVisibility: true,
        legend: 'none',
        layerIds: ['county_layer_la', 'county_layer_la_highlight'],
        info: 'county'
      }
    ]
  },
  {
    id: 'la_county_rubber_plantations',
    label: 'Natural rubber',
    icon: EconAct,
    description: '',
    info: 'county',
    controls: uicontrols_rubber_plantations
  },
  {
    id: 'la_county_social_risks',
    label: 'Social risks',
    icon: EconAct,
    description: '',
    info: 'Social risks LA - county',
    // Layer
    defaultVisibility: true,
    legend: 'none',
    layerIds: [],
    controls: [
      //  Social risk for year
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
        chartsIds: ['social_risk_total', 'social_risk_event_type'],
        info: 'Social risk for year'
      },
      //  Labor availability for county
      {
        id: 'ctrl_agepop_2010_stat_la',
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
      ...uicontrols_social_risks
    ]
  },
  {
    id: 'la_county_environmental_risks',
    label: 'Environmental risks',
    icon: AdminBoundaries,
    description: '',
    info: 'county',
    controls: [
      ...uicontrols_environmental_risks,

      // tropical storm choropleth map for county
      {
        id: 'ctrl_tropical_storm_total_la',
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
        chartsIds: ['tropical_storm_stats_year_speed', 'tropical_storm_total'],
        info: 'Tropical storm for year'
      }
    ]
  },
  {
    id: 'la_county_economic_risks',
    label: 'Economic risks',
    icon: AdminBoundaries,
    description: '',
    info: 'county',
    controls: [
      // Rubber lpp choropleth map for county
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
