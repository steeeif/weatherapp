import React, { Component } from 'react'

class Info extends Component {
  state = {
    info: []
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.info !== this.props.info) {
      this.setState({ info: nextProps.info })
    }
  }

  render() {
    if (this.state.info.length > 0) return <h1>{this.state.info}</h1>
    return <div />
  }
}

export default Info
