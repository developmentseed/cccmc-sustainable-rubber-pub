import generalRisksinfo from './generalRisksinfo'
import envRiskinfo from './envRiskinfo'
import rubberEcoinfo from './rubberEcoinfo'
import rubberMLInfos from './rubberMLInfos'
import socialRiskInfos from './socialRiskInfos'

export default {
  dataInformation: '天然橡胶和其风险数据层',
  layersDetails: '风险数据来源和分析方法',
  rubberPlantations: '一级二级平台风险数据表',
  /**
   * Tabs
   */
  riskData: '平台风险数据',
  naturalRubberRisk: '天然橡胶图层和人工智能算法',
  enviromentalRisk: '环境风险图层',
  socialRisk: '社会风险图层',
  economicRisk: '橡胶经济风险图层',
  ...generalRisksinfo,
  ...envRiskinfo,
  ...rubberEcoinfo,
  ...rubberMLInfos,
  ...socialRiskInfos
}
