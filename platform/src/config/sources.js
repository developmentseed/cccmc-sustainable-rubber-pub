/**
 * Sources state which data the map should display. Specify the type of source
 * with the "type" property, which must be one of vector, raster, raster-dem,
 * geojson, image, video. Adding a source isn't enough to make data appear on
 * the map because sources don't contain styling details like color or width.
 * Layers refer to a source and give it a visual representation. This makes it
 * possible to style the same source in different ways, like differentiating
 * between types of roads in a highways layer.
 *
 * Tiled sources (vector and raster) must specify their details according to
 * the TileJSON specification. There are several ways to do so:
 *
 * - By supplying TileJSON properties such as "tiles", "minzoom", and "maxzoom"
 *   directly in the source
 * - By providing a "url" to a TileJSON resource
 * - By providing a URL to a WMS server that supports EPSG:3857 (or
 *   EPSG:900913) as a source of tiled data. The server URL should contain a
 *   "{bbox-epsg-3857}" replacement token to supply the bbox parameter.
 *
 * See: https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/
 */

export default {
  /**
   * Raster Tilesets
   *
   * Usage example:
   * map.addSource('source-id', {
   *   type: 'raster',
   *   url: 'mapbox://tilesetid',
   *   tileSize: 256,
   * })
   */
  raster: [
    // Landslides
    {
      id: 'landslide_risk_la_source',
      layer: 'landslide_risk_la',
      tilesetid: 'cccmc.landslide_risk_la'
    },
    {
      id: 'landslide_risk_mm_source',
      layer: 'landslide_risk_mm',
      tilesetid: 'cccmc.landslide_risk_mm'
    },
    {
      id: 'landslide_risk_vn_source',
      layer: 'landslide_risk_vn',
      tilesetid: 'cccmc.landslide_risk_vn'
    },
    // Landuser
    {
      id: 'landuse_la_source',
      layer: 'landuse_la',
      tilesetid: 'cccmc.landuse_la'
    },
    {
      id: 'landuse_mm_source',
      layer: 'landuse_mm',
      tilesetid: 'cccmc.landuse_mm'
    },
    {
      id: 'landuse_vn_source',
      layer: 'landuse_vn',
      tilesetid: 'cccmc.landuse_vn'
    },
    // Forest loss
    {
      id: 'forest_loss_la_source',
      layer: 'forest_loss_la',
      tilesetid: 'cccmc.forest_loss_la'
    },
    {
      id: 'forest_loss_mm_source',
      layer: 'forest_loss_mm',
      tilesetid: 'cccmc.forest_loss_mm'
    },
    {
      id: 'forest_loss_vn_source',
      layer: 'forest_loss_vn',
      tilesetid: 'cccmc.forest_loss_vn'
    },
    // Market accessibility
    {
      id: 'market_accessibility_la_source',
      layer: 'market_accessibility_la',
      tilesetid: 'cccmc.market_accessibility_la'
    },
    {
      id: 'market_accessibility_mm_source',
      layer: 'market_accessibility_mm',
      tilesetid: 'cccmc.market_accessibility_mm'
    },
    {
      id: 'market_accessibility_vn_source',
      layer: 'market_accessibility_vn',
      tilesetid: 'cccmc.market_accessibility_vn'
    },
    // rubber plantation 2020
    {
      id: 'rubber_plantations_2020_la_source',
      layer: 'rubber_plantations_2020_la',
      tilesetid: 'cccmc.rubber_plantations_2020_la'
    },
    {
      id: 'rubber_plantations_2020_mm_source',
      layer: 'rubber_plantations_2020_mm',
      tilesetid: 'cccmc.rubber_plantations_2020_mm'
    },
    {
      id: 'rubber_plantations_2020_vn_source',
      layer: 'rubber_plantations_2020_vn',
      tilesetid: 'cccmc.rubber_plantations_2020_vn'
    }
  ],
  /**
   * Vector Tilesets
   *
   * Usage example:
   * map.addSource('source-id', {
   *  type: 'vector',
   *  url: 'mapbox://tilesetid'
   * });
   */

  vector: [
    {
      id: 'base_source',
      layer: 'base',
      tilesetid: 'cccmc.cccmc_admins'
    },
    {
      id: 'country_source',
      layer: 'country',
      tilesetid: 'cccmc.cccmc_admins'
    },
    {
      id: 'province_source',
      layer: 'province',
      tilesetid: 'cccmc.cccmc_admins'
    },
    {
      id: 'county_source',
      layer: 'county',
      tilesetid: 'cccmc.cccmc_admins'
    }
  ],
  /**
   * GeoJSON Datasets
   *
   * Usage example:
   * map.addSource('source-id', {
   *  type: 'geojson',
   *  data: 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_ports.geojson'
   * });
   */
  geojson: [

  ]
}
