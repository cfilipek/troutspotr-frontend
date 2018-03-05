import BaseApi from './BaseApi'
import has from 'lodash-es/has'
import keyBy from 'lodash-es/keyBy'
import { IUsState } from 'coreTypes/state/IUsState'
export const buildStateEndpoint = stateName => `/data/v3/${stateName}/${stateName}.data.json`

const stateCache = {}

export const updateStateObject = (stateMetadata: IUsState) => {
  const regsDictionary = keyBy(stateMetadata.regulations, 'id')
  // tslint:disable-next-line:forin
  for (const prop in stateMetadata.waterOpeners) {
    const stateOpeners = stateMetadata.waterOpeners[prop].openers
    stateOpeners.forEach(opener => {
      opener.end_time = new Date(opener.end_time)
      opener.start_time = new Date(opener.start_time)
      opener.restriction = regsDictionary[opener.restriction_id]
    })
    stateOpeners.sort((a, b) => {
      return +a.start_time - +b.start_time
    })
  }

  // sort the waters.
  const result = {
    ...stateMetadata,
    regulationsDictionary: regsDictionary,
    roadTypesDictionary: keyBy(stateMetadata.roadTypes, 'id'),
    palTypesDictionary: keyBy(stateMetadata.palTypes, 'id'),
  }
  return result
}

export class StateApi extends BaseApi {
  async getStateData(stateName) {
    if (stateName == null) {
      return Promise.reject('state name was not specificed')
    }

    const endpoint = buildStateEndpoint(stateName)
    if (has(stateCache, endpoint)) {
      return stateCache[endpoint]
    }

    const gettingState = this.get(endpoint).then(updateStateObject)

    stateCache[endpoint] = gettingState
    return stateCache[endpoint]
  }
}

export default new StateApi()