import * as React from 'react'

export interface ITitleProps {
  title?: string
}
export class TitleComponent extends React.PureComponent<ITitleProps> {
  render() {
    const { title } = this.props
    return <span>{title}</span>
  }
}

export default TitleComponent