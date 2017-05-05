import { connect } from 'react-redux'
import MapComponent from './Map.component'
import { loadMapModuleAsync } from 'ui/core/MapboxModule.state'
import { mapboxModuleSelector, isMapboxModuleLoadedSelector } from 'ui/core/MapboxModule.selectors'
import { setIsMapInitialized, selectMapFeature, selectFoculPoint } from './Map.state.interactivity'
import { selectedStateIdSelector, selectedRegionIdSelector } from 'ui/core/Core.selectors'
import { selectedStreamObjectSelector,
  getSpecialRegulationsCurrentSeasonSelector,
  getSelectedRoadSelector,
  troutStreamDictionarySelector,
  isFinishedLoadingRegion } from 'ui/@state/@region/Region.selectors'

import { withRouter } from 'react-router'

import {
  isReadyToInsertLayersSelector,
  getMapCameraSelector,
  getMapGroundSelector,
  getMapSettingsSelector,
  getMapInteractivitySelector } from './Map.selectors'

const mapDispatchToProps = {
  loadMapModuleAsync: () => loadMapModuleAsync(),
  setIsMapInitialized: isInitialized => setIsMapInitialized(isInitialized),
  selectMapFeature: (feature) => selectMapFeature(feature),
  selectFoculPoint: (feature) => selectFoculPoint(feature)
}

const mapStateToProps = (state) => {
  let props = {
    mapboxModule: mapboxModuleSelector(state),
    mapboxModuleStatus: isMapboxModuleLoadedSelector(state),
    isReadyToInsertLayers: isReadyToInsertLayersSelector(state),
    camera: getMapCameraSelector(state),
    ground: getMapGroundSelector(state),
    settings: getMapSettingsSelector(state),
    interactivity: getMapInteractivitySelector(state),
    selectedState: selectedStateIdSelector(state),
    selectedRegion: selectedRegionIdSelector(state),
    selectedGeometry: selectedStreamObjectSelector(state),
    specialRegulationsCurrentSeason: getSpecialRegulationsCurrentSeasonSelector(state),
    selectedRoad: getSelectedRoadSelector(state),
    streamDictionary: troutStreamDictionarySelector(state),
    isRegionFinishedLoading: isFinishedLoadingRegion(state)
  }

  return props
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MapComponent))
