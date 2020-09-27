import React, {Component} from 'react'
// import PropTypes from 'prop-types'
import classes from './Home.scss'
// import Button from './Button.component.js'
// import MapImage from '../../media/map.jpg'

class HomeComponent extends Component {

  renderTitle () {
    return (<h2 className={classes.title}>TroutSpotr</h2>)
  }

  renderPreamble () {
    return (<div className={classes.equation}>
      <div>
        <span className={classes.blue}>Trout Streams</span>
      </div>
      <div className={classes.equationSpan}>
        <span className={classes.plus}>+</span>
        <span className={classes.green}>Public Land</span>
      </div>
      <div className={classes.equationSpan}>
        <span className={classes.plus}>+</span>
        <span>Public Roads</span>
      </div>
      <hr />
      <div>
        <span className={classes.white}>Safe & Legal Fishing</span>
      </div>
    </div>)
  }

  renderInfo () {
    return (<div className={classes.importantText}>
      <p>TroutSpotr is a tool that helps you make <span className={classes.public}>safe and legal choices</span> when fishing for trout.</p>
    </div>)
  }

  renderAgreeInfo () {
    return (<div className={classes.secondaryText}>
       <p>However, before you use it, you must <span className={classes.private}>understand and agree</span> to some ground rules first.</p>
    </div>)
  }



  render () {
    return (<div className={classes.homeContainer}>
      <div className={classes.titleContainer}>
        {this.renderTitle()}
        {this.renderPreamble()}
      </div>
      {this.renderInfo()}
      {this.renderAgreeInfo()}

    <div className={classes.buttonContainer}>
      <button className={classes.button} >Continue to Terms of Service</button>
      {/* <button className={classes.buttonTwo} >Or Choose To Learn More</button> */}
      </div>
    </div>)
  }
}

export default HomeComponent
