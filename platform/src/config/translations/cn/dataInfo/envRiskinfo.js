export default {
  // Protected areas
  title_Protectedareas: '自然保护区',
  body_Protectedareas: `

### 数据来源
[全球森林观察之保护区（Global Forest Watch Protect Aeras）](https://data.globalforestwatch.org/datasets/medd::protected-area?geometry=-10.500%2C-10.873%2C52.782%2C4.437);

### 数据说明
建立在国家森林区域或其他具有国家、省或地方利益区域的受保护区域，包括：1）自然综合体保护区；2）国家公园；3）自然遗迹；4）栖息地或物种管理区；5）生物圈保护区；6）受保护的陆地或海洋景观；7）动植物园；8）狩猎区和保护区；9）特殊法律法规规定的其他类别保护区，旨在保护动植物物种、土壤、水、山脉或其他自然栖息地。这些区域主要受2014年2月11日关于自然保护的第14/003号法律管辖。该数据集是由ICCN在FORAF项目框架内由中非森林观测站（OFAC）支持生成。

### 数据分析
更多数据分析方法请查看[GitHub源码](https://github.com/developmentseed/cccmc-sustainable-rubber-pub/blob/main/data-prep/process_vector.sh/#L123-L131)。
  `,

  // Tiger conservation areas

  title_Tigerconservationareas: '老虎保护区',
  body_Tigerconservationareas: `

### 数据来源
[全球森林观察之老虎保护区（Global Forest Watch Tiger Conservation Areas）](https://data.globalforestwatch.org/datasets/04d892c083f54c638228931da081467b_3?geometry=-19.630%2C-3.772%2C-126.505%2C49.898)

### 数据说明
老虎保护区是适合老虎栖息的大块连续或相连区域，该区域应至少可供五只成年老虎生活休憩，并且在过去十年中有确认老虎存在的记录。该数据集是通过将老虎的分布图（由土地覆盖类型、森林范围和猎物数据编制）与人类影响指数相叠加而生成。与适宜栖息地重叠但受人类活动影响较大的区域不被视为老虎栖息地。

### 数据分析
更多数据分析方法请查看[GitHub源码](https://github.com/developmentseed/cccmc-sustainable-rubber-pub/blob/main/data-prep/process_vector.sh/#L113-L121)。
  `,

  // Forest loss

  title_Forestloss: '森林资源丧失',
  body_Forestloss: `

### 数据来源
[开放发展湄公河计划](https://data.opendevelopmentmekong.net/dataset/hansen-forest-cover-loss-2000-2019-thailand-vietnam-laos-cambodia-myanmar?type=dataset) (数据年份2001-2019年)

### 数据说明
在此数据集中，“树木覆盖”特指所有高度大于5米的植被，可为天然林或人工林形式中的冠层密度。“损失”表示树木被清除或死亡，这可能由多种因素造成，包括机械采伐、火灾、疾病或暴风破坏等。因此，“损失”并不等同于毁林。由于研究方法和内容日期的差异，因此无法准确比较树木覆盖、损失和收益数据集。因此，不能通过从树木覆盖率收益减去树木覆盖率损失来简单的计算“净”损失，并且不能将2000年树木覆盖率减去年树木覆盖损失数据来确定当前（2000年后）的树木覆盖率。

### 数据分析
更多数据分析方法请查看[GitHub源码](https://github.com/developmentseed/cccmc-sustainable-rubber-pub/blob/main/data-prep/raster_stats.sh)。
  `,

  // Landslides

  title_Landslides: '滑坡',
  body_Landslides: `

### 数据来源
[NASA GLC](https://maps.nccs.nasa.gov/arcgis/apps/webappviewer/index.html?id=824ea5864ec8423fb985b33ee6bc05b7)

### 数据说明
全球滑坡清单是NASA科学家和公众科学家共同努力的结果。NASA全球滑坡目录（GLC）是迄今为止已知的最大且公开可用的全球因降雨触发的地块运动清查数据。该清单是在NASA哥达德太空飞行中心（GSFC）创建，目前包含超过11,500份全球范围内的滑坡、泥石流、雪崩等相关报告。滑坡报道主要来自在线媒体，包括新闻报道和其他数据库。GLC由NASA哥达德太空飞行中心（GSFC）的科学家、实习生和其他同事共同编写。在同行评审文章中，GLC被引用75次以上。

### 数据分析
更多数据分析方法请查看[GitHub源码](https://github.com/developmentseed/cccmc-sustainable-rubber-pub/blob/main/data-prep/raster_stats.sh)。
  `,

  // Costal flood, Drought and Riverine flood

  title_CostalfloodDroughtand: '沿海洪水、干旱和河流洪害',
  body_CostalfloodDroughtand: `

### 数据来源
[世界资源研究所的水道水风险地图（World Resources Institute (WRI) Aqueduct）](https://www.wri.org/resources/data-sets/aqueduct-global-maps-30-data)
### 数据说明
这三个数据集/指标摘自WRI的水道水风险框架（Aqueduct™），该框架中，我们将13个水风险指标（包括数量、质量和重复风险）组合到一个综合的水风险总评分中。
### 数据分析
更多数据分析方法请查看[GitHub源码](https://github.com/developmentseed/cccmc-sustainable-rubber-pub/blob/main/data-prep/process_vector.sh/#L132-L163)。

  `,

  // Tropical storm'

  title_Tropicalstorm: '热带风暴',
  body_Tropicalstorm: `

### Source
[人道主义数据交换（HDX）系统](https://data.humdata.org/dataset/asia-pacific-storm-tracks-1956-to-2018)

### 数据说明
数据由联合国人道主义事务协调厅(OCHA)提供。文件包括西太平洋、南太平洋、南印度和北印度盆地过去50年热带风暴路径的历史信息。属性提供每个观测点的详细信息，例如风暴名称、日期、时间、风速和GPS点。有关速度转换和暴风类别的更多详细信息，请参见风速值（单位：Knot（哩/小时））。

### 数据分析
更多数据分析方法请查看[GitHub源码](https://github.com/developmentseed/cccmc-sustainable-rubber-pub/blob/main/data-prep/process_vector.sh/#L92-L111)。

  `
}
