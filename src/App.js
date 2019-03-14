import React, { Component } from 'react'
import GoogleSuggest from './components/autoCompleteComponent'
import SmhiApi from './components/apiComponent'
import Info from './components/infoComponent'
import './App.css'

class App extends Component {
  state = {
    cords: [],
    info: []
  }

  handleCords = newCords => {
    this.setState({ cords: newCords })
  }

  handleInfo = newInfo => {
    this.setState({ info: newInfo })
  }

  render() {
    return (
      <div className="App">
        <div className="vertical-center">
          <div className="container">
            <div className="row mb-2 ">
              <div className="col-md-6 offset-3">
                <Info info={this.state.info} />
                <GoogleSuggest
                  onNewCordsSet={this.handleCords}
                  onWrongCitySelected={this.handleInfo}
                />
                <SmhiApi cords={this.state.cords} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
