import React, {Component} from 'react'
import PropTypes from 'prop-types'
import BackButtonContainer from './backButton/BackButton.container'
import SearchContainer from './search/Search.container'
import MinimapContainer from './minimap/Minimap.container'
import HeaderLayout from './Header.layout'
import TitleComponent from './title/Title.component'
import SubtitleComponent from './subtitle/Subtitle.component'
import ClipboardButton from 'react-clipboard.js'
import ClipboardIconComponent from 'ui/core/clipboard/ClipboardIcon.component'

class HeaderContainer extends Component {
  renderMinimap () {
    return (<MinimapContainer
      params={this.props.params}
      location={this.props.location}
    />)
  }

  renderSearch () {
    if (this.props.isSearchVisible) {
      return (<SearchContainer />)
    }

    return null
  }

  renderLocationSubtitle () {
    return (<SubtitleComponent
      subtitle={this.props.subtitle}
    />)
  }

  renderTitle () {
    if (this.props.isTitleVisible === false) {
      return null
    }

    const body = (<TitleComponent
      title={this.props.title}

      isVisible={this.props.isTitleVisible}
    />)

    const symbol = (<ClipboardIconComponent
      size={14}
      style={{'fill': 'hsla(199, 69%, 61%, 1)', 'color': 'hsla(199, 69%, 61%, 1)'}}
    />)
    return (<ClipboardButton
      onClick={this.props.onCopyToClipboard}
      component="a"
      data-clipboard-text={window.location.href}
      button-title="Copy to clipboard"
    >
      <span>{body} {this.props.isIconVisible && symbol}</span>
    </ClipboardButton>)
  }

  renderBackButton () {
    return (<BackButtonContainer
      previous={'/'}
      isEnabled={false}
    />)
  }

  render () {
    return (
      <HeaderLayout
        backButton={this.renderBackButton()}
        locationSubtitle={this.renderLocationSubtitle()}
        title={this.renderTitle()}
        isOffline={this.props.isOffline}
        minimap={this.renderMinimap()}
        search={this.renderSearch()}
      />
    )
  }
}

HeaderContainer.propTypes = {
  'subtitle': PropTypes.string.isRequired,
  'title': PropTypes.string,
  'isTitleVisible': PropTypes.bool.isRequired,
  'isSearchVisible': PropTypes.bool.isRequired,
  'isIconVisible': PropTypes.bool.isRequired,
  'params': PropTypes.object.isRequired,
  'location': PropTypes.object.isRequired,
  'isOffline': PropTypes.bool.isRequired,
  'onCopyToClipboard': PropTypes.func.isRequired,
}

export default HeaderContainer