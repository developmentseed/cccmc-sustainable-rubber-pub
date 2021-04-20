export default {
  // Protected areas
  title_Protectedareas: 'Protected areas',
  body_Protectedareas: `

  ### Source
  [Global Forest Watch Protect Aeras](https://data.globalforestwatch.org/datasets/medd::protected-area?geometry=-10.500%2C-10.873%2C52.782%2C4.437);

  ### About the data
  Protected areas are established in the state forest domain or in other sites of national, provincial or local interest and include: 1) Natural Integral Reserves; 2) National Parks; (3) Natural monuments; 4) Habitat or species management areas; 5) Biosphere Reserves; 6) Protected land or sea landscapes; 7) Zoological and Botanical Gardens; 8) Hunting Areas and Reserves; (9) any other category that special laws and regulations designate as such for the conservation of species of fauna and flora, soil, water, mountains or other natural habitats. These areas are managed mainly by Law No. 14/003 of 11 February 2014 on nature conservation. This dataset is produced by the ICCN with the support of the Central African Forest Observatory ( OFAC) within the framework of the FORAF project. 

  ### Data analysis
  For more data analysis methods, please check [GitHub source code](https://github.com/developmentseed/cccmc-sustainable-rubber/blob/master/data-prep/process_vector.sh/#L123-L131).
  `,

  // Tiger conservation areas

  title_Tigerconservationareas: 'Tiger conservation areas',
  body_Tigerconservationareas: `

  ### Source
  [Global Forest Watch Tiger Conservation Areas](https://data.globalforestwatch.org/datasets/04d892c083f54c638228931da081467b_3?geometry=-19.630%2C-3.772%2C-126.505%2C49.898)

  ### About the data
  Tiger conservation areas are large blocks of contiguous or connected area of suitable tiger habitat that that can support at least five adult tigers and where tiger presence has been confirmed in the past 10 years. The data set was created by mapping tiger distribution, determined by land cover type, forest extent, and prey base, against a human influence index. Areas of high human influence that overlapped with suitable habitat were not considered tiger habitat. 

  ### Data analysis
  For more data analysis methods, please check [GitHub source code](https://github.com/developmentseed/cccmc-sustainable-rubber/blob/master/data-prep/process_vector.sh/#L113-L121).
  `,

  // Forest loss

  title_Forestloss: 'Forest loss',
  body_Forestloss: `

  ### Source
  [Open Development Mekong](https://data.opendevelopmentmekong.net/dataset/hansen-forest-cover-loss-2000-2019-thailand-vietnam-laos-cambodia-myanmar?type=dataset) (Data available from 2001 to 2019)

  ### About the data
  In this data set, “tree cover” is defined as all vegetation greater than 5 meters in height, and may take the form of natural forests or plantations across a range of canopy densities. “Loss” indicates the removal or mortality of tree cover and can be due to a variety of factors, including mechanical harvesting, fire, disease, or storm damage. As such, “loss” does not equate to deforestation. Due to variation in research methodology and date of content, tree cover, loss, and gain data sets cannot be compared accurately against each other. Accordingly, “net” loss cannot be calculated by subtracting figures for tree cover gain from tree cover loss, and current (post-2000) tree cover cannot be determined by subtracting figures for annual tree cover loss from year 2000 tree cover.

  ### Data analysis
  For more data analysis methods, please check [GitHub source code](https://github.com/developmentseed/cccmc-sustainable-rubber/blob/master/data-prep/raster_stats.sh).
  `,

  // Landslides

  title_Landslides: 'Landslides',
  body_Landslides: `

  ### Source
  [NASA GLC](https://maps.nccs.nasa.gov/arcgis/apps/webappviewer/index.html?id=824ea5864ec8423fb985b33ee6bc05b7)

  ### About the data
  The global inventory of landslides are collective efforts by NASA scientists and citizen scientists. The NASA Global Landslide Catalog (GLC) is the largest openly available global inventory of rainfall-triggered mass movements known to date. The inventory was created in at NASA Goddard Space Flight Center (GSFC) and currently contains more than 11,500 reports on landslides, debris flows, rock avalanches, etc. around the world. Reports of landslides are found primarily from online media, including news articles as well as other databases. The GLC has been compiled by scientists, interns and other colleagues at NASA GSFC. The GLC has been cited more than 75 times in peer-reviewed articles. 

  ### Data analysis
  For more data analysis methods, please check [GitHub source code](https://github.com/developmentseed/cccmc-sustainable-rubber/blob/master/data-prep/raster_stats.sh).
  `,

  // Costal flood, Drought and Riverine flood

  title_CostalfloodDroughtand: 'Costal flood, Drought and Riverine flood',
  body_CostalfloodDroughtand: `

  ### Source
  [World Resources Institute (WRI) Aqueduct](https://www.wri.org/resources/data-sets/aqueduct-global-maps-30-data)
  ### About the data
  These three datasets/indicators were extracted from Aqueduct™ water risk framework of WRI, in which we combine 13 water risk indicators—including quantity, quality, and repetitional risks—into a composite overall water risk score.

  ### Data analysis
  For more data analysis methods, please check [GitHub source code](https://github.com/developmentseed/cccmc-sustainable-rubber/blob/master/data-prep/process_vector.sh/#L132-L163).
  `,

  // Tropical storm'

  title_Tropicalstorm: 'Tropical storm',
  body_Tropicalstorm: `

  ### Source
  [Humanitarian Data Exchange (HDX)](https://data.humdata.org/dataset/asia-pacific-storm-tracks-1956-to-2018)

  ### About the data
  The data was provided by OCHA. The shape file consists of consolidated history of tropical storm paths over the past 50 years in the West Pacific, South Pacific, South Indian and North Indian basin. Attributes provides details such as storm Name, Date, Time, wind speed and GPS points for each advisory point. Wind speeds are in knots for more details on speeds conversion and storm categories

  ### Data analysis
  For more data analysis methods, please check [GitHub source code](https://github.com/developmentseed/cccmc-sustainable-rubber/blob/master/data-prep/process_vector.sh/#L92-L111).
  `
}
