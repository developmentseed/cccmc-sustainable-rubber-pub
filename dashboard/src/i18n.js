import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// en
import NAV_TRANSLATIONS_EN from './config/translations/en/nav.js'
import HOME_TRANSLATIONS_EN from './config/translations/en/home.js'
import EXPLORE_TRANSLATIONS_EN from './config/translations/en/explore.js'
import DATA_INFO_TRANSLATIONS_EN from './config/translations/en/dataInfo'
import INFO_TRANSLATIONS_EN from './config/translations/en/info.js'

// cn
import NAV_TRANSLATIONS_CN from './config/translations/cn/nav.js'
import HOME_TRANSLATIONS_CN from './config/translations/cn/home.js'
import EXPLORE_TRANSLATIONS_CN from './config/translations/cn/explore.js'
import DATA_INFO_TRANSLATIONS_CN from './config/translations/cn/dataInfo'
import INFO_TRANSLATIONS_CN from './config/translations/cn/info.js'

const resources = {
  // Ussing Namspaces
  en: {
    nav: NAV_TRANSLATIONS_EN,
    home: HOME_TRANSLATIONS_EN,
    explore: EXPLORE_TRANSLATIONS_EN,
    dataInfo: DATA_INFO_TRANSLATIONS_EN,
    info: INFO_TRANSLATIONS_EN
  },
  cn: {
    nav: NAV_TRANSLATIONS_CN,
    home: HOME_TRANSLATIONS_CN,
    explore: EXPLORE_TRANSLATIONS_CN,
    dataInfo: DATA_INFO_TRANSLATIONS_CN,
    info: INFO_TRANSLATIONS_CN
  }
}
i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  keySeparator: false,
  interpolation: {
    escapeValue: false
  }
})

export default i18n
