import generalRisksinfo from './generalRisksinfo'
import envRiskinfo from './envRiskinfo'
import rubberEcoinfo from './rubberEcoinfo'
import rubberMLInfos from './rubberMLInfos'
import socialRiskInfos from './socialRiskInfos'

export default {
  dataInformation: 'Data information',
  layersDetails: 'Layers details',
  rubberPlantations: 'Rubber plantations',
  /**
   * Tabs
   */
  riskData: 'Risk Data',
  naturalRubberRisk: 'Natural Rubber and ML',
  enviromentalRisk: 'Enviromental Risk',
  socialRisk: 'Social Risk',
  economicRisk: 'Economic Risk',
  ...generalRisksinfo,
  ...envRiskinfo,
  ...rubberEcoinfo,
  ...rubberMLInfos,
  ...socialRiskInfos
}
