/**
 * Converts the uicontrols config structure into the initital
 * ui state object
 */
export const init = (uicontrols) => {
  return uicontrols.reduce((obj, cur) => {
    return (
      cur.controls.map((control) => {
        if (control.subcontrols) {
          return control.subcontrols.map(
            (subcontrol) =>
              (obj[subcontrol.id] = {
                visibility: subcontrol.defaultVisibility,
                domain: subcontrol.legend.domain,
                range: subcontrol.legend.defaultRange,
                label: control.label,
                legendMap: control.legendMap || [],
                chartsIds: control.chartsIds ? control.chartsIds : []
              })
          )
        }
        return (obj[control.id] = {
          visibility: control.defaultVisibility,
          domain: control.legend.domain,
          range: control.legend.defaultRange,
          label: control.label,
          legendMap: control.legendMap || [],
          chartsIds: control.chartsIds ? control.chartsIds : []
        })
      }),
      obj
    )
  }, {})
}

/**
 * Searches for the given layer id in the controls and subcontrols.
 * Returns the first control id that contains the layer id.
 * @param {String} layerId the id of a layer that should be controlled
 */
export const getControlIdForLayer = (layerId, uicontrols) => {
  let id
  uicontrols.map((group) => {
    group.controls.map((control) => {
      if (control.subcontrols) {
        control.subcontrols.find((subcontrol) => {
          if (subcontrol.layerIds.includes(layerId)) {
            id = subcontrol.id
            return true
          }
          return false
        })
      }

      if (control.layerIds && control.layerIds.includes(layerId)) {
        id = control.id
        return true
      }
      return false
    })
  })

  // if (!id) { console.warn(`Layer "${layerId}" is not assigned to any control group.`) }
  return id
}
