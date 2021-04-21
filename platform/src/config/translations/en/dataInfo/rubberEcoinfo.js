export default {
  // Market accessibility'

  title_Marketaccessibility: 'Market accessibility',
  body_Marketaccessibility: `

  ### Source
  [The Malaria Atlas Project](https://malariaatlas.org/research-project/accessibility-to-cities/)

  ### About the data
  Predicted travel time (minutes) to nearest city; A global map of travel time to cities to assess inequalities in accessibility in 2015.

  ### Data analysis
  For more data analysis methods, please check [GitHub source code](https://github.com/developmentseed/cccmc-sustainable-rubber-pub/blob/main/data-prep/raster_stats.sh).
  `,
  //  Rubber least profitable price

  title_Rubberleastprofitableprice: 'Rubber least profitable price',
  body_Rubberleastprofitableprice: `
  ### Source
  Dr. Zhuangfang Yi’s pioneer research [work in 2015](https://rpubs.com/Geoyi/Rubber_Bio_In_Asia)

  ### About the data

  The least profitable rubber price at the county level
  Notebook illustrates how to compute the least profitable rubber price ($/kg) at the county level in Laos, Myanmar, and Vietnam.

  The cost of natural rubber contributed from:

  - the costs of rubber plantation establishment and management;
  - the costs of natural rubber harvest;
  - the costs of natural rubber transportation;
  - the social-economic factors include the social discount rate, least hourly labor cost and the average rubber productivity of rubber plantations in each countries, etc.

  **The minimum price for sustainable livelihood of rubber smallholders**

  To maintain a sustainable livelihood for smallholding rubber farmers in East Asia, the economic returns of natural rubber products must at least equal the overall costs of establishing, managing and harvesting the rubber plantation. In this study, we calculated a minimum price for natural rubber products, again at the county level, at which rubber cultivation would be sustainable. Therefore, if the actual market price of the product is higher than the minimum price, the smallholders will profit. However, if the actual price is lower than the minimum price, rubber cultivation is not a sustainable livelihood for them. The minimum price is the average minimum price over 25 years of rubber plantation lifespan. The county-level minimum rubber prices were calculated in the eight study countries. To be able to calculate the minimum price of natural rubber products, an economic concept was introduced here: the net present value (NPV). NPV represents a time series of cash flow for investment, for which future revenue is discounted to represent opportunity costs in relation to the present value. It is an efficient investment while NPV is positive, but it is not while the NPV is negative.

  It’s written in a formula as:

  <!--NPV-->
  <img src="/assets/images/NPV.png" width="50%"></img>

  Bt is the gross economic returns for the plantation in our study, it is equal to the rubber yield multiply by the price at year t. Ct represents the overall cost calculated above. r is the discount rate. Simply, discount rate tells the expected return rate for the individual investor. While the investor uses higher discount rate, which means he/she expected higher return rate from the investment. In this study we use social discount rate, which is the expected return rate for the society. The social discount rate is higher in the less developed countries, which means the investors expect to have their investment cash back sooner than the investors who invests in the more developed countries or regions. A higher social discount rate also indicates the less public sector investment for the country. As less developed countries in tropical Asia and rubber has been listed as a tree cash crop for poverty alleviation, e.g. Laos, Myanmar, and Cambodia, have a higher social discount rate compare to other study countries. The minimum price could be calculated when Bt - Ct = 0, which means that the minimum price is the price that could cover the overall cost for having a rubber plantation. In this study it was calculated as:

  <!--Rubber least profitable price-->
  <img src="/assets/images/Rubber_lpp.png" width="50%"></img>

  ### Data analysis
  For more data analysis methods, please check [GitHub source code](https://github.com/developmentseed/cccmc-sustainable-rubber-pub/blob/main/data-prep/process_vector.sh/#L206).
  `
}
