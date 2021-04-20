import sources from './sources'
// Laos
import la_layers from './la/layers'
import la_uicontrols_country from './la/uicontrols_country'
import la_uicontrols_province from './la/uicontrols_province'
import la_uicontrols_county from './la/uicontrols_county'

// Vietnam
import vn_layers from './vn/layers'
import vn_uicontrols_country from './vn/uicontrols_country'
import vn_uicontrols_province from './vn/uicontrols_province'
import vn_uicontrols_county from './vn/uicontrols_county'

// Myanmar
import mm_layers from './mm/layers'
import mm_uicontrols_country from './mm/uicontrols_country'
import mm_uicontrols_province from './mm/uicontrols_province'
import mm_uicontrols_county from './mm/uicontrols_county'

import theme from './theme'

// if (!process.env.MAPBOX_ACCESS_TOKEN) {
//   throw new Error('MAPBOX_ACCESS_TOKEN env var is required')
// }

export default {
  mapboxAccessToken: process.env.MAPBOX_ACCESS_TOKEN,
  formAction: process.env.FORMSPREE_FORM_ID,
  siteName: 'Rubber Risk Mitigation Platform',
  siteAcronym: 'RRMP',
  imageUrl: '/assets/home.svg',
  sources,
  countries: {
    la: {
      countryName: 'Laos',
      countryCode: 'la',
      center: [105.744, 18.411],
      zoom: 5,
      layers: la_layers,
      // uicontrols: la_uicontrols,
      uicontrols: {
        country: la_uicontrols_country,
        province: la_uicontrols_province,
        county: la_uicontrols_county
      },
      dataLayers: []
    },
    // Myanmar
    mm: {
      countryName: 'Myanmar',
      countryCode: 'mm',
      center: [95.81436, 21.16323],
      zoom: 6,
      layers: mm_layers,
      uicontrols: {
        country: mm_uicontrols_country,
        province: mm_uicontrols_province,
        county: mm_uicontrols_county
      },
      dataLayers: []
    },
    // Vietnam
    vn: {
      countryName: 'Vietnam',
      countryCode: 'vn',
      center: [103.88101, 18.87523],
      zoom: 6,
      layers: vn_layers,
      uicontrols: {
        country: vn_uicontrols_country,
        province: vn_uicontrols_province,
        county: vn_uicontrols_county
      },
      dataLayers: []
    }
  },
  theme,
  sateliteBase: {
    type: 'raster',
    tiles: [
      'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=' +
        process.env.MAPBOX_ACCESS_TOKEN
    ],
    tileSize: 512
  },
  mapBaseStyle: 'mapbox://styles/cccmc/cklh1bmmw051v17mv633cbaka'
}
