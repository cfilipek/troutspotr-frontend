import { createSelector } from 'reselect'
import { isRootPageSelector, locationSelector } from 'ui/Location.selectors'
import { IReduxState } from 'ui/redux/Store.redux.rootReducer'
import { has, isEmpty } from 'lodash'
import { View } from 'ui/core/Core.redux'

export const statesGeoJsonSelector = (reduxState: IReduxState) => reduxState.core.statesGeoJson
export const countiesGeoJsonSelector = (reduxState: IReduxState) => reduxState.core.countiesGeoJson
export const regionsGeoJsonSelector = (reduxState: IReduxState) => reduxState.core.regionsGeoJson

export const statesDictionarySelector = (reduxState: IReduxState) =>
  reduxState.core.statesDictionary
export const countiesDictionarySelector = (reduxState: IReduxState) =>
  reduxState.core.countyDictionary
export const regionsDictionarySelector = (reduxState: IReduxState) =>
  reduxState.core.regionDictionary
export const hasAgreedToTermsSelector = (reduxState: IReduxState) =>
  reduxState.core.hasAgreedToTerms
export const hasSeenIntroScreenSelector = (reduxState: IReduxState) =>
  reduxState.core.hasSeenIntroScreen
export const hasSeenTermsOfServiceSelector = (reduxState: IReduxState) =>
  reduxState.core.hasSeenTermsOfService
export const hasSeenPrivacyPolicySelector = (reduxState: IReduxState) =>
  reduxState.core.hasSeenPrivacyPolicy
// Export const streamCentroidsGeoJsonSelector = (reduxState: IReduxState) => reduxState.core.streamCentroidsGeoJson
export const tableOfContentsLoadingStatusSelector = (reduxState: IReduxState) =>
  reduxState.core.tableOfContentsLoadingStatus
export const searchTextSelector = (reduxState: IReduxState) => reduxState.core.searchText

export const viewSelector = (reduxState: IReduxState): View => reduxState.core.view

export const isListVisible = createSelector([viewSelector], view => view === View.list)

export const selectedStateIdSelector = createSelector(
  [isRootPageSelector, locationSelector],
  (isRoot, location) => {
    if (isRoot) {
      return null
    }

    const params = location.pathname.split('/')
    const stateParam = params.length >= 2 ? params[1].toLowerCase() : null

    return stateParam
  }
)

export const selectedRegionIdSelector = createSelector(
  [isRootPageSelector, locationSelector],
  (isRoot, location) => {
    if (isRoot) {
      return null
    }

    const params = location.pathname.split('/')
    const regionParam = params.length >= 3 ? params[2].toLowerCase() : null

    return regionParam
  }
)

export const selectedStreamIdSelector = createSelector(
  [isRootPageSelector, locationSelector],
  (isRoot, location) => {
    if (isRoot) {
      return null
    }

    const params = location.pathname.split('/')
    const streamSlugParam = params.length >= 4 ? params[3].toLowerCase() : null

    return streamSlugParam
  }
)

export const selectedStateSelector = createSelector(
  [selectedStateIdSelector, statesDictionarySelector],
  (stateId, statesDictionary) => {
    if (isEmpty(statesDictionary)) {
      return null
    }

    const isStateFound = has(statesDictionary, stateId)
    if (isStateFound === false) {
      return null
    }

    const state = statesDictionary[stateId]
    return state
  }
)

export const isSearchingSelector = createSelector([searchTextSelector], searchText => {
  if (searchText == null) {
    return false
  }

  const isSearchNonEmpty = isEmpty(searchText) === false
  return isSearchNonEmpty
})

export const selectedRegionPathKeySelector = createSelector(
  [selectedStateIdSelector, selectedRegionIdSelector],
  (selectedStateId, selectedRegionId) => {
    if (isEmpty(selectedStateId)) {
      return null
    }

    if (isEmpty(selectedRegionId)) {
      return null
    }

    const regionPathKey = `${selectedStateId}/${selectedRegionId}`
    return regionPathKey
  }
)

export const selectedRegionSelector = createSelector(
  [selectedRegionPathKeySelector, regionsDictionarySelector],
  (regionPathKey, regionsDictionary) => {
    if (isEmpty(regionsDictionary)) {
      return null
    }

    if (isEmpty(selectedRegionPathKeySelector)) {
      return null
    }

    const isRegionFound = has(regionsDictionary, regionPathKey)
    if (isRegionFound === false) {
      return null
    }

    const region = regionsDictionary[regionPathKey]
    return region
  }
)
