import { createAction, handleActions } from 'redux-actions'
import { Loading } from 'ui/core/LoadingConstants'
import { getApi } from 'api/Api.module'
// import TableOfContentsApi from 'api/TableOfContentsApi'
import keyBy from 'lodash-es/keyBy'
// import AnonymousAnalyzerApi from 'api/AnonymousAnalyzerApi'
import { updateCachedEndpoints } from 'ui/page/offline/Offline.redux'
// ------------------------------------
// Constants
// ------------------------------------
export enum View {
  map,
  list,
}

export const REGION_SET_VIEW = 'REGION_SET_VIEW'
export const HAS_AGREED_TO_TERMS = 'HAS_AGREED_TO_TERMS'
export const SET_AGREEMENT_STATE = 'SET_AGREEMENT_STATE'
// ------------------------------------
// Actions
// ------------------------------------
export const setViewToMap = createAction(REGION_SET_VIEW, x => View.map)
export const setViewToList = createAction(REGION_SET_VIEW, x => View.list)

export const GEO_SET_TABLE_OF_CONTENTS = 'GEO_SET_TABLE_OF_CONTENTS'
export const GEO_TABLE_OF_CONTENTS_LOADING = 'GEO_TABLE_OF_CONTENTS_LOADING'
export const GEO_TABLE_OF_CONTENTS_LOADING_FAILED = 'GEO_TABLE_OF_CONTENTS_LOADING_FAILED'
export const GEO_UPDATE_SEARCH_TEXT = 'GEO_UPDATE_SEARCH_TEXT'

export const setTableOfContents = createAction(GEO_SET_TABLE_OF_CONTENTS, x => x)
export const setTableOfContentsLoading = createAction(GEO_TABLE_OF_CONTENTS_LOADING)
export const setTableOfContentsFailed = createAction(GEO_TABLE_OF_CONTENTS_LOADING_FAILED)
export const setAgreeToTerms = createAction(HAS_AGREED_TO_TERMS, x => x)
export const setAgreementState = createAction(SET_AGREEMENT_STATE)

const updateSearchTextAction = createAction(GEO_UPDATE_SEARCH_TEXT, item => item)
export const updateSearchText = searchText => async dispatch => {
  // TODO: debounce this and check for 3 character limit
  const sanitizedString = searchText == null ? '' : searchText.trim()
  dispatch(updateSearchTextAction(sanitizedString))
}

export const agreeToTerms = isAgreed => dispatch => {
  const agreement = isAgreed ? 'true' : 'false'
  dispatch(setAgreeToTerms(agreement))
}

export const fetchTableOfContents = () => async dispatch => {
  dispatch(setTableOfContentsLoading())
  try {
    const { TableOfContentsApi } = await getApi()
    const gettingTableOfContents = TableOfContentsApi.getTableOfContents()
    const [tableOfContents] = await Promise.all([gettingTableOfContents])
    dispatch(setTableOfContents(tableOfContents))
    dispatch(updateCachedEndpoints())
  } catch (error) {
    dispatch(setTableOfContentsFailed()) // eslint-disable-line
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS: any = {
  [REGION_SET_VIEW]: (state: ICoreState, { payload }): ICoreState => {
    try {
      getApi().then(({ AnonymousAnalyzerApi }) => {
        AnonymousAnalyzerApi.recordEvent('view_change', { view: payload })
      })
    } catch (error) {}

    const view = payload || INITIAL_CORE_STATE.view
    const newState = { ...state, ...{ view } }
    return newState
  },

  [GEO_SET_TABLE_OF_CONTENTS]: (state: ICoreState, { payload }): ICoreState => {
    const newState = {
      ...state,

      ...{
        statesGeoJson: payload.states,
        statesDictionary: keyBy(payload.states.features, s =>
          s.properties.short_name.toLowerCase()
        ),

        countiesGeoJson: payload.counties,
        countyDictionary: keyBy(payload.counties.features, c => c.properties.gid),

        regionsGeoJson: payload.regions,
        regionDictionary: keyBy(payload.regions.features, r => r.properties.path.toLowerCase()),

        streamCentroidsGeoJson: payload.streamCentroids,
        tableOfContentsLoadingStatus: Loading.Success,
      },
    }
    return newState
  },
  [GEO_TABLE_OF_CONTENTS_LOADING]: (state: ICoreState, { payload }): ICoreState => {
    const newState = { ...state, ...{ tableOfContentsLoadingStatus: Loading.Pending } }
    return newState
  },
  [GEO_TABLE_OF_CONTENTS_LOADING_FAILED]: (state: ICoreState, { payload }): ICoreState => {
    const newState = { ...state, ...{ tableOfContentsLoadingStatus: Loading.Failed } }
    return newState
  },
  [GEO_UPDATE_SEARCH_TEXT]: (state: ICoreState, { payload }): ICoreState => {
    const newState = { ...state, ...{ searchText: payload } }
    return newState
  },
  // [HAS_AGREED_TO_TERMS]: (state: ICoreState, { payload }): ICoreState => {
  //   if (localStorage != null && localStorage.setItem != null) {
  //     try {
  //       localStorage.setItem(HAS_AGREED_TO_TERMS, payload)
  //     } catch (e) {
  //       console.log('could not store token; perhaps private mode?') // eslint-disable-line
  //     }
  //   }

  //   const newState = { ...state, ...{ hasAgreedToTerms: payload === 'true' } }
  //   return newState
  // },
  // [SET_AGREEMENT_STATE]: (state: ICoreState, { payload }): ICoreState => {
  //   const { view, time } = payload
  //   if (view == null || time == null) {
  //     throw new Error('view and time cannot be null')
  //   }

  //   if (view === 'intro') {
  //     const newState = { ...state, ...{ hasSeenIntroScreen: true } }
  //     AnonymousAnalyzerApi.recordEvent('agreement_update', { view, timeEllapsed: time })
  //     return newState
  //   } else if (view === 'termsOfService') {
  //     const newState = { ...state, ...{ hasSeenTermsOfService: true } }
  //     AnonymousAnalyzerApi.recordEvent('agreement_update', { view, timeEllapsed: time })
  //     return newState
  //   } else if (view === 'privacyPolicy') {
  //     const newState = { ...state, ...{ hasSeenPrivacyPolicy: true } }
  //     AnonymousAnalyzerApi.recordEvent('agreement_update', { view, timeEllapsed: time })
  //     return newState
  //   }
  //   return { ...state }
  // },
}

export const isBot = (): boolean => {
  /* eslint-disable no-useless-escape */
  const botPattern =
    '(googlebot/|Googlebot-Mobile|Googlebot-Image|Google favicon|Mediapartners-Google|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|Twitterbot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis)'
  const re = new RegExp(botPattern, 'i')
  const userAgent = navigator.userAgent
  return re.test(userAgent)
}

const getHasAgreedToTerms = (): boolean => {
  if (isBot()) {
    // try {
    //   AnonymousAnalyzerApi.recordEvent('bot_detected', { bot: navigator.userAgent })
    // } catch (error) {
    //   // do nothing
    // }

    return true
  }
  if (localStorage == null) {
    return false
  }

  return localStorage.getItem(HAS_AGREED_TO_TERMS) === 'true'
}

// ------------------------------------
// Reducer
// ------------------------------------
export interface ICoreState {
  view: View
  isMapModuleLoaded: boolean
  isMapReadyToDisplay: boolean
  searchText: string
  statesGeoJson: any
  statesDictionary: any
  countiesGeoJson: any
  countyDictionary: any
  regionsGeoJson: any
  regionDictionary: any
  tableOfContentsLoadingStatus: Loading
  hasAgreedToTerms: boolean
  hasSeenIntroScreen: boolean
  hasSeenTermsOfService: boolean
  hasSeenPrivacyPolicy: boolean
}
const INITIAL_CORE_STATE: ICoreState = {
  view: isBot() ? View.list : View.map,
  isMapModuleLoaded: false,
  isMapReadyToDisplay: false,
  searchText: '',
  statesGeoJson: {},
  statesDictionary: {},
  countiesGeoJson: {},
  countyDictionary: {},
  regionsGeoJson: {},
  regionDictionary: {},
  tableOfContentsLoadingStatus: Loading.NotStarted,
  hasSeenIntroScreen: false,
  hasSeenTermsOfService: false,
  hasSeenPrivacyPolicy: false,
  hasAgreedToTerms: getHasAgreedToTerms(),
}

// export default function counterReducer(state = initialState, action) {
//   const handler = ACTION_HANDLERS[action.type]
//   return handler ? handler(state, action) : state
// }

export default handleActions(ACTION_HANDLERS, INITIAL_CORE_STATE)