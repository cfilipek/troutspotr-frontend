// import { injectReducer } from 'ui/reducers'

export default (store) => ({
  path : '/:state/:region/list/:streamId',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const StreamItem = require('./StreamItem.container').default
      cb(null, StreamItem)
    }, 'streamItem')
  }
})
