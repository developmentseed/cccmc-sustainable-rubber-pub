export default {
  // Market accessibility'
  title_Marketaccessibility: '市场通达率',
  body_Marketaccessibility: `

  ### 数据来源
  [全球疟疾数据网](https://malariaatlas.org/research-project/accessibility-to-cities/)

  ### 数据说明
  从任意一点到最近城市的旅行时间（以分钟计算）; 全球从任意一点到最近城市的旅行时间（2015年基准数据）。

  ### 数据分析
  更多数据分析方法请查看[GitHub源码](https://github.com/developmentseed/cccmc-sustainable-rubber/blob/master/data-prep/raster_stats.sh)。
  `,

  //  Rubber least profitable price

  title_Rubberleastprofitableprice: '天然橡胶县级最低成本价格',
  body_Rubberleastprofitableprice: `

### 数据来源
天然橡胶最低成本价格（美金/公斤）以依庄防博士的[2015年的研究工作为基础](https://rpubs.com/Geoyi/Rubber_Bio_In_Asia)

### 数据说明
天然橡胶最低成本价格的计算和模拟源码可以参考 [Development Seed的Jupyter Notebook]()，目前数据更新到老挝、缅甸和越南县级水平。
最低成本价格以橡胶园25年胶龄为基准，成本计算包括了：
- 天然橡胶园开发、种植和管理成本；
- 天然橡胶胶乳的收割成本；
- 天然橡胶产品运输到最近市场的交通成本；
- 每个国家特有的社会贴现率、最低劳动工资、和平均橡胶园产量等等。

**天然橡胶最低成本价格**
维持天然橡胶投资者和种植户最有效的经济手段就是计算生产一公斤天然橡胶的经济成本是多少。在此基础之上，只有天然橡胶产品的市场价格高于该最低成本价格，种植户和投资者才能从橡胶园中盈利。

天然橡胶最低成本价格的计算由橡胶园经济贴现值计算而来。经济贴现值以生态经济学看国家和地区长期投资回报率。该公式可以简化为：

<!--NPV-->
<img src="/assets/images/NPV.png" width="100%"></img>

天然橡胶最低成本价格从NPV转化而来，可以简化为公式：

<!--Rubber least profitable price-->
<img src="/assets/images/Rubber_lpp.png" width="100%"></img>

### 数据分析
更多数据分析方法请查看[GitHub源码](https://github.com/developmentseed/cccmc-sustainable-rubber/blob/master/data-prep/process_vector.sh/#L206)。
  `
}
