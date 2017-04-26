import React, { PropTypes, Component } from 'react'
import classes from './MicroMap.scss'
import * as Micromap from './Micromap'

// calling getBoundingClientRect in WebKit is
// excruciatingly slow. CACHE IT FOR PERFORMANCE!
let boundingRectangleCache = null

class SneezeGuardComponent extends Component {
  constructor () {
    super()
    this.onClick = this.onClick.bind(this)
    this.renderMap = this.renderMap.bind(this)
  }

  componentWillUpdate (nextProps) {
    this.fireRenderToCanvas(nextProps.streamObject)
  }

  componentDidMount () {
    if (this.canvasElement == null) {
      return
    }
    if (boundingRectangleCache == null) {
      boundingRectangleCache = this.canvasElement.getBoundingClientRect()
    }
    let { height, width } = boundingRectangleCache
    this.width = width
    this.height = height
    let devicePixelRatio = window.devicePixelRatio || 1
    this.canvasContext = Micromap.setUpCanvas(this.canvasElement, this.width, this.height, devicePixelRatio)
    this.dimensions = {
      width,
      height,
      radius: (Math.min(width, height) - 3) * 0.5,
      buffer: 3,
      arcCompressionRatio: 0.90,
      rotatePhase: Math.PI / 2
    }
    this.fireRenderToCanvas(this.props.streamObject)
  }

  renderToCanvas (streamObject) {
    if (window.requestIdleCallback != null) {
      window.requestIdleCallback(() => {
        Micromap.drawStreamToCanvas(this.canvasContext, streamObject, this.dimensions)
      })
      return
    }

    // it's polite to save our canvas style here.
    // draw a big rectangle to clear our canvas.
    // this.canvasContext.fillStyle = colors.MoodyGray
    // this.canvasContext.save()
    let offset = (Math.random() * 200) + 80
    setTimeout(() => {
      Micromap.drawStreamToCanvas(this.canvasContext, streamObject, this.dimensions)
    }, offset)
  }

  fireRenderToCanvas (streamObject) {
    this.renderToCanvas(streamObject)
  }

  componentWillUnmount () {
    // console.log('unmounted')
  }

  onClick (e) {

  }

  renderMap (canvasElement) {
    if (canvasElement == null) {
      return
    }
    this.canvasElement = canvasElement
  }

  shouldComponentUpdate (nextProps) {
    if (nextProps.streamObject.stream.properties.gid !== this.props.streamObject.stream.properties.gid) {
      return true
    }
    return false
  }

  render () {
    return (
      <div onClick={this.onClick} className={classes.container}>
        <canvas id={this.props.id} className={classes.microMap} ref={this.renderMap} />
      </div>)
  }
}

SneezeGuardComponent.propTypes = {
  streamObject: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired
}

export default SneezeGuardComponent
