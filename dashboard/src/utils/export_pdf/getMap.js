/**
 * Function to get the map in image/png base64
 */
export default () => {
  // Catch Map as base64
  const mapCanvas = document.getElementsByClassName('mapboxgl-canvas')[0]
  const mapDataURL = mapCanvas.toDataURL('image/png')
  const mapAspectRatio = mapCanvas.height / mapCanvas.width
  return {
    mapDataURL,
    mapAspectRatio
  }
}
