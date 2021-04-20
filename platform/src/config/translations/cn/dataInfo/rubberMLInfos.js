export default {
  // Rubber plantation
  title_Rubberplantation: '天然橡胶园分布图',
  body_Rubberplantation: `

  ### 数据来源
  老挝、越南和缅甸三国2020年的天然橡胶园是大规模机器学习和卫星遥感影像的模型输出结果。Development Seed合成了几百万个欧洲航空航天署的Sentinel-2卫星影像片段（tile），每个卫星影像片段覆盖6.6平方公里。


  ### 数据说明
  最终的橡胶园分布图层为三年(2018， 2019和2020年)橡胶园合成图。该橡胶层在平台上被定为“2020年橡胶园分布图”。如果您想查看更多关于Development Seed团队如何运用机器学习算法和Sentinel-2卫星遥感影像解译三年三国橡胶图层，请查阅该页面提及的最后一个图层“天然橡胶和机器学习算法”。在该图层说明中，您也将查看到跟多的模型模拟和影像解译信息。
  关于为何和如何把三年的橡胶图层合成为“2020年橡胶园分布图”，具体理由如下：
  - 热带亚洲的卫星影像云层覆盖率高。虽然Sentinel-2卫星影像的空间分辨率为10米，每16天卫星采集一次影像（回采率16天/次）。因为云层覆盖率高，可能有影像像素缺失等现象，以及空气中水汽和雾霾的缘故，影像像素也会变得模糊。把多时段影像像素进行合成和解译有利于排除我们提到的像素缺失和模糊等问题。
  - 因为卫星影像像素原因，机器学习算法在解译像素信息是否含有橡胶树时可能产生误差，因此通过图像合成，可达到提高最终橡胶分布图层准确率的作用;

  ### 数据分析
  更多数据分析方法请查看[GitHub源码](https://github.com/developmentseed/cccmc-sustainable-rubber/blob/master/data-prep/scripts/rubber_plantations_raster/index.sh)。
  `,

  // Natural Rubber Export and Import

  title_NaturalRubberExportandImport: '天然橡胶进出口信息',
  body_NaturalRubberExportandImport: `

  ### 数据来源
  [世界粮农组织统计办公室](http://www.fao.org/faostat/en/#rankings/countries_by_commodity)

  ### 数据说明

  我们从世界粮农组织统计学办公室网站中提取国家级别的天然橡胶进出口信息，该信息涵盖了2010到2019的天然（干）橡胶产品.

  `,

  // Annual Rubber Price
  title_AnnualRubberPrice: '天然橡胶市场价格',
  body_AnnualRubberPrice: `

  ### 数据来源
  [YCharts](https://ycharts.com/indicators/singapore_malaysia_rubber_price)新加坡或马来西亚干胶交易价格。

  ### 数据说明
  - 新加坡和马来西亚橡胶交易价格的单位为美元每公斤。
  - 原橡胶价格为每月橡胶交易价格，在此基础上我们把橡胶价格计算为年平均天然橡胶交易价格方便在平台上的图标实现。
  - 平台上年平均橡胶交易价格涵盖2010年2020年数据`,

  // Mapping rubber plantation with ML'
  title_MappingrubberplantationwithML: '天然橡胶分布图和机器学习',
  body_MappingrubberplantationwithML: `

  ### 数据来源
  [Development Seed](https://developmentseed.org/) GeoAI 团队采用机器学习算法LightGBM算法来解译Sentinel-2卫星影像。LightGBM算法最初由微软机器学习团队开发。

  ### 数据和机器学习算法说明

  #### 机器学习算法训练数据集
  每个机器学习算法（人工智能算法）都需要有训练数据集来帮助算法学习。在该应用中训练数据集的作用是通过建立卫星遥感影像Sentinel-2和天然橡胶园之间的数学关系。我们生成的天然橡胶园训练数据集以2010年Jeff Fox博士团队的科研论文为基础。
  关于我们如何从高分辨率遥感影像中采集训练数据集，您可查看[我们的报告](https://paper.dropbox.com/doc/Rubber-plantation-Mapping-Workflow--BIzgL_eX0ttKxddH_0PvRXoiAg-3jHWL8nmX05lI7diXpw3n)。

  <img src="/assets/images/josm_training.gif" width="100%"></img>
  机器学习算法训练数据集的生成包括：

  | 国家                    | 总橡胶园数 |
  | -------------------------- | ------------------------ |
  | 老挝                       | 1,007                    |
  | 缅甸                    | 1,004                    |
  | 越南                    | 1,077                    |
  | 中国云南省               | 193                      |
  | **总数**                  | **3,281**                |

  最终我们生成了大约~ 3,300 个橡胶园训练数据集.

  #### 机器学习（人工智能）算法

  [LightGBM](https://en.wikipedia.org/wiki/LightGBM) 由微软机器学习算法团队开发. 该算法是基于卫星影像像素和橡胶园之间的数学关系来解译天然橡胶园的分布图.
  该算法和模型在老挝、缅甸和越南中的模拟准确率高.

  以下为算法模拟过程中我们生成的模型模拟评估结果。

  <!--The confusion matrix from three country LightGBM model between rubber and not rubber pixel-wise classification.-->

  <img src="/assets/images/bands_indices.png" width="100%"></img>

   <img src="/assets/images/confusion_matrix.png" width="100%" height="50%"></img>

  <img src="/assets/images/country_lightgbm_1.png" width="100%"></img>

  <img src="/assets/images/country_lightgbm_2.png" width="100%"></img>

  <!--The trained three country LightGBM model runs over the test dataset.-->

  <img src="/assets/images/country_lightgbm_3.png" width="100%"></img>


  #### 训练的机器学习模型在三国橡胶制图中的模型预测结果

  生成和训练机器学习算法的目的就是用很少的训练数据找卫星影像像素和天然橡胶园之间的数学关系，进而可以用来解译比训练区跟大的区域。
  该模型训练区域充其量只有三国1%不到的土地面积。而模型训练完成之后可以运用到三国三年的卫星遥感影像，并在百千万卫星影像像素中查找橡胶林。
  这个过程包括了：

  - 首先合成三国三年的卫星遥感影像像素合成;
  - 在云端计算机上跑训练好的机器学习算法，让其从以上合成的卫星遥感影像像素中查找橡胶园像素。
  - 这个模型的在通过Development speed的Chip n Scale开源软件上完成，当橡胶园像素被预测之后，该像素会被RDS数据库记录在云端计算机;
  - 工程师通过读取和解译云端计算机记录的RDS数据库来生成橡胶分布图.
  - 通过合成三国三年的橡胶图层来增加橡胶园的机器学习预测结果。

  `
}
