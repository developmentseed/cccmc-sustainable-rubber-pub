export default {
  // Social conflicts
  title_Socialconflicts: '社会冲突',
  body_Socialconflicts: `
### 数据来源

[武装冲突地点和事件数据项目](https://acleddata.com/)

### 数据说明
ACLED旨在收集有关非洲、中东、拉丁美洲和加勒比、东亚、南亚、东南亚、中亚以及高加索、欧洲和美国报告的所有政治暴力和抗议事件的地点、日期、参与者、死亡人数和类型的实时数据。

### 数据分析
更多数据分析方法请查看[GitHub源码](https://github.com/developmentseed/cccmc-sustainable-rubber/blob/master/data-prep/process_vector.sh/#L80-L90)。

  `,

  // Labor availability

  title_Laboravailability: '劳工可用性率',
  body_Laboravailability: `
### 数据来源
[美国航空航天署NASA社会经济数据中心](https://sedac.ciesin.columbia.edu/data/set/gpw-v4-population-density-adjusted-to-2015-unwpp-country-totals-rev11)

### 数据说明
数据是“高分辨率人口密度图+人口统计估算值（人口分布不均的地区）”的一部分。为此，我们将这些图层的男女人口作为指标，但是这里未提及图层相对应地20至60岁的人口。

### 数据分析
更多数据分析方法请查看[GitHub源码](https://github.com/developmentseed/cccmc-sustainable-rubber/blob/master/data-prep/process_vector.sh/#L165-L178)。

  `,

  // Corruption perception index
  title_Corruptionperception: '世界国家腐败指数',
  body_Corruptionperception: `
### 数据来源

[全球透明网](https://www.transparency.org/en/cpi/2020/media-kit#)

### 数据说明

腐败数据值从0到100，0为超级腐败100为超级廉洁， CPI通过评估全球180个国家的公共部门腐败报道情况来给每个国家的腐败指数打分.

平台上的数据指数包含2012年到2020的数据值`,

  // Land use

  title_Landuse: '土地利用',
  body_Landuse: `

### Source
Copernicus 全球土地利用- [The Copernicus Global Land Service (CGLS)](https://land.copernicus.eu/global/)

### 数据说明
CGLS是欧洲对地观测旗舰计划之哥白尼土地监测核心服务（LMCS）的组成部分。全球土地服务面向全球以中低空间分辨率为基础，对陆地表面的状态和演变系统生成一系列合格的生物地球物理产品，并辅以较长的时间序列。这些产品用于植被、水循环、能量收支和地面冰冻圈的监测。

### 数据分析
更多数据分析方法请查看[GitHub源码](https://github.com/developmentseed/cccmc-sustainable-rubber/blob/master/data-prep/raster_stats.sh)。

  `
}
