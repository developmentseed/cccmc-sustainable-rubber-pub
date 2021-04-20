export default {
  // Social conflicts
  title_Socialconflicts: 'Social conflicts',
  body_Socialconflicts: `
  ### Source

  [The Armed Conflict Location & Event Data Project](https://acleddata.com/)

  ### About the data

  ACLED collects real-time data on the locations, dates, actors, fatalities, and types of all reported political violence and protest events across Africa, the Middle East, Latin America & the Caribbean, East Asia, South Asia, Southeast Asia, Central Asia & the Caucasus, Europe, and the United States of America.

  ### Data analysis
  For more data analysis methods, please check [GitHub source code](https://github.com/developmentseed/cccmc-sustainable-rubber/blob/master/data-prep/process_vector.sh/#L80-L90).
  `,

  // Labor availability

  title_Laboravailability: 'Labor availability',
  body_Laboravailability: `
  ### Source
  [NASA Socioeconomic Data and Applications Center (SEDAC)](https://sedac.ciesin.columbia.edu/data/set/gpw-v4-population-density-adjusted-to-2015-unwpp-country-totals-rev11)

  ### About the data

  Data is comming from The Gridded Population of the World (GPW) collection, version 4, which models the distribution of human population on a continuous global raster
  surface. From those, We are getting the estimated population ages from 15-59 for men and women.
  
  ### Data analysis
  For more data analysis methods, please check [GitHub source code](https://github.com/developmentseed/cccmc-sustainable-rubber/blob/master/data-prep/process_vector.sh/#L165-L178).
  `,

  // Corruption perception index
  title_Corruptionperception: 'Corruption perception index',
  body_Corruptionperception: `
  ### Source

  [Transparency International](https://www.transparency.org/en/cpi/2020/media-kit#)

  ### About the data

  Using a scale of zero to 100, where zero is highly corrupt and 100 is very clean, the CPI ranks 180 countries and territories by their perceived levels of public sector corruption.

  Data available from 2012 to 2020 in the platform.`,

  // Land use

  title_Landuse: 'Land use',
  body_Landuse: `

  ### Source
  Copernicus Global Land use mapping effort- [The Copernicus Global Land Service (CGLS)](https://land.copernicus.eu/global/)

  ### About the data
  CGLS is a component of the Land Monitoring Core Service (LMCS) of Copernicus, the European flagship programme on Earth Observation. The Global Land Service systematically produces a series of qualified bio-geophysical products on the status and evolution of the land surface, at global scale and at mid to low spatial resolution, complemented by the constitution of long term time series. The products are used to monitor the vegetation, the water cycle, the energy budget and the terrestrial cryosphere. 

  ### Data analysis
  For more data analysis methods, please check [GitHub source code](https://github.com/developmentseed/cccmc-sustainable-rubber/blob/master/data-prep/raster_stats.sh).
  `
}
