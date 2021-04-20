export default {
  // Rubber plantation
  title_Rubberplantation: 'Rubber plantation',
  body_Rubberplantation: `

  ### Source
  Rubber planation mapping was the product of machine learning modeling.


  ### About the data
  Rubber plantation layer was composited from rubber plantations in 2018, 2019 and 2020. We talked about how the planation were produced in our Rubber ML data info page (see the last section of this page), and for more detail machine learning, large scale model inference, please see the info page.

  The reason we take the composite of three years were:

  - The coverage of seasonal satellite imagery of Sentinel-2 through three years may be different due to cloud cover, image availability and artifacts;
  - Due to the confident threshed score, we may bring in some false positive rubber pixels;

  Therefore, by compositing the multiple rubber planation from multiple years, we will eliminate the misclassified pixels of rubber planation in Laos, Vietnam and Myanmar.

  ### Data analysis
  For more data analysis methods, please check [GitHub source code](https://github.com/developmentseed/cccmc-sustainable-rubber/blob/master/data-prep/scripts/rubber_plantations_raster/index.sh).
  `,

  // Natural Rubber Export and Import

  title_NaturalRubberExportandImport: 'Natural Rubber Export and Import',
  body_NaturalRubberExportandImport: `

  ### Source
  [FAO Stats](http://www.fao.org/faostat/en/#rankings/countries_by_commodity)
  
  ### About the data
  
  Export and import quantity data of Rubber natural and Rubber natural dry was extracted from "Countries by commodity" menu from years 2010 to 2019, according the data availability in the source.`,

  // Annual Rubber Price
  title_AnnualRubberPrice: 'Annual Rubber Price',
  body_AnnualRubberPrice: `
  ### Source
  [YCharts](https://ycharts.com/indicators/singapore_malaysia_rubber_price). Singapore/Malaysia Rubber Price.
  
  ### About the data
  - The Singapore/Malaysia Rubber Price measures the overall price in US dollars per Kilogram.
  - The natural rubber price was extracted as monthly price and further we take the average of 12 months to annual rubber price.
  - Data available from 2010 to 2020 in the platform.`,

  // Mapping rubber plantation with ML'
  title_MappingrubberplantationwithML: 'Mapping rubber plantation with ML',
  body_MappingrubberplantationwithML: `
  ### Source
  [Development Seed](https://developmentseed.org/) GeoAI team applied machine learning, specifically LightGBM to produce the rubber maps in Laos, Myanmar and Vietnam.

  ### About the data and model
  #### Training Datasets
  We used existing rubber planation layer in 2010 in three countries as reference data layer to searching for rubber plantations on top of:

  - Composited Sentinel-2 bands, indices x, y, z;
  - High resolution Bing and Google maps available through JSOM tool.

  <img src="/assets/images/josm_training.gif" width="100%"></img>
  Tracing rubber planation on top of high-res, Sentinel-2 and available 2010 rubber planation layer.

  | Country                    | Total rubber plantations |
  | -------------------------- | ------------------------ |
  | Laos                       | 1,007                    |
  | Myanmar                    | 1,004                    |
  | Vietnam                    | 1,077                    |
  | Outside to the 3 countries | 193                      |
  | **Total**                  | **3,281**                |

  In the end, total ~ 3,300 rubber plantations training polygons were created for the following machine learning model training.

  #### Machine Learning Model - LightGBM

  [LightGBM](https://en.wikipedia.org/wiki/LightGBM) short for Light Gradient Boosting Machine, is a free and open source distributed gradient boosting framework for machine learning originally developed by Microsoft. We use it to develop our binary pixel-wise rubber planation mapping.
  The combined model with the training dataset from three countries (Laos, Vietnam and Myanmar) performs consistently.

  The graph shows the importance of the variables that wen to train the model. The variables were made of four seasons of Sentinel-2 bands and indices.

  <!--The confusion matrix from three country LightGBM model between rubber and not rubber pixel-wise classification.-->

  <img src="/assets/images/bands_indices.png" width="100%"></img>

  <img src="/assets/images/confusion_matrix.png" width="100%" height="50%"></img>
  
  <img src="/assets/images/country_lightgbm_1.png" width="100%"></img>

  <img src="/assets/images/country_lightgbm_2.png" width="100%"></img>

  <!--The trained three country LightGBM model runs over the test dataset.-->

  <img src="/assets/images/country_lightgbm_3.png" width="100%"></img>


  #### LightGBM Model Inference

  To run model inference over three countries over composited four seasons Sentinel-2. It requires us to create:

  - seasonal median composites (~0.25 million tiles of zoom 14 per year) for 2018, 2019, 2020 for Laos, Vietnam, and Myanmar;
      - The composites were created using Development Seed’s open source tools cog-mosaic, rio-tiler;
      - Tile-WatchBot was another open-sourced tool created to pull seasonal composites with required variables for the LightGBM model;
  - a LightGBM-Serving was created to run model inference on AWS;
  - DevSeed’s open-sourced tool Chip n Scale take RestFul API from LightGBM-Serving and run model on AWS, push the prediction to RDS Database;
  - the predicted rubber plantations across three countries, Laos, Vietnam and Myanmar, then reconstructed as Cloud Optimized GeoTiff for 2018, 2019 and 2020.
  - we then composited and take only overlap pixels of 2018, 2019 and 2020 layers as the latest rubber plantations 2020 for three countries to get rid of artifacts that may created from missing pixels of Sentinel composites because of cloud cover and other artifacts.
      
  `
}
