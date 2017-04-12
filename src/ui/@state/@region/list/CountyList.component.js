import React, { Component } from 'react'
import classes from './List.scss'
import { isEmpty } from 'lodash'
import StreamListComponent from './StreamList.component'
class CountyListComponent extends Component {
  renderCounty (county, index) {
    let { gid, name, streams } = county
    return (<li key={gid} className={classes.countyListItem}>
      <div className={classes.listHeaderContainer}>

        <div className={classes.listTitle}>{name} Co.</div>
      </div>
      <StreamListComponent
        isListVisible={this.props.isListVisible}
        visibleTroutStreams={streams}
        selectedState={this.props.selectedState}
        selectedRegion={this.props.selectedRegion}
      />
    </li>)
  }

  renderCounties () {
    let { visibleCounties } = this.props
    if (isEmpty(visibleCounties)) {
      return null
    }

    return (<ul className={classes.countyListContainer}>
      {visibleCounties.map((county, index) => this.renderCounty(county, index))}
    </ul>)
  }

  render () {
    let { isListVisible } = this.props
    return (
      <div className={isListVisible ? classes.listViewContainer : classes.invisible}>
        {this.renderCounties()}
        <div className={classes.godAwfulPlaceholder} />
      </div>)
  }
}

CountyListComponent.propTypes = {
  isListVisible: React.PropTypes.bool.isRequired,
  visibleCounties: React.PropTypes.array.isRequired,
  selectedState: React.PropTypes.string.isRequired,
  selectedRegion: React.PropTypes.string.isRequired
}

export default CountyListComponent
