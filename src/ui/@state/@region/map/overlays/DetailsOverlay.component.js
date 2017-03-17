import React, { PropTypes } from 'react'
import classes from './MapOverlay.scss'
import AccessPointDetails from './AccessPointDetails.component'
import RegionDetails from './RegionDetails.component'
import StreamDetails from './StreamDetails.component'
import MessageOverlay from 'ui/core/messageOverlay/MessageOverlay.component'

import { isEmpty } from 'lodash'

const DetailsOverlayComponent = React.createClass({
  propTypes: {
    visibleTroutStreams: PropTypes.array,
    selectedAccessPoint: PropTypes.object,
    selectedStream: PropTypes.object
  },

  componentDidMount () {
    // console.log('LIST VIEW MOUNTED')
  },

  renderRegionDetails () {
    let { selectedStream, selectedAccessPoint } = this.props
    let isVisible = isEmpty(selectedStream) && isEmpty(selectedAccessPoint)
    if (isVisible === false) {
      return null
    }

    return (<RegionDetails />)
  },

  renderStreamDetails () {
    let { selectedStream, selectedAccessPoint } = this.props
    let isVisible = isEmpty(selectedStream) === false && isEmpty(selectedAccessPoint)
    if (isVisible === false) {
      return null
    }

    return (<StreamDetails
      selectedStream={selectedStream} />)
  },

  renderAccessPointDetails () {
    let { selectedStream, selectedAccessPoint } = this.props
    let isVisible = isEmpty(selectedStream) === false && isEmpty(selectedAccessPoint) === false
    if (isVisible === false) {
      return null
    }

    return (<AccessPointDetails
      selectedStream={selectedStream}
      selectedAccessPoint={selectedAccessPoint} />)
  },

  render () {
    if (isEmpty(this.props.visibleTroutStreams)) {
      return null
    }

    return (
      <MessageOverlay position='top'>
        <div className={classes.container}>
          {this.renderRegionDetails()}
          {this.renderStreamDetails()}
          {this.renderAccessPointDetails()}
        </div>
      </MessageOverlay>)
  }
})
export default DetailsOverlayComponent
