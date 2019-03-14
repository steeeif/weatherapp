import React, { Component } from 'react'

class WeatherApi extends Component {
  state = {
    items: [],
    cords: [],
    currenTemp: '',
    error: ''
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cords !== this.props.cords) {
      this.setState({ cords: nextProps.cords })
      this.fetchForcast(nextProps.cords)
    }
  }

  fetchForcast(cords) {
    let lon = cords[0]
    let lat = cords[1]
    fetch(
      `http://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${lon}/lat/${lat}/data.json`
    )
      .then(res => res.json())
      .then(json => {
        this.setState({
          items: json
        })
        let val = this.state.items.timeSeries[0].parameters.filter(
          el => el.unit === 'Cel'
        )
        this.setState({
          currenTemp: val[0].values
        })
      })
      .catch(error => {
        this.setState({
          error: error
        })
        console.error('Error:', error)
      })
  }
  renderCurentTemp() {
    return <h1>{this.state.currenTemp}&#8451;</h1>
  }

  formatDateTime(dateToClean) {
    var dateString = new Date(dateToClean)
      .toISOString()
      .replace(/[a-zA-Z]/g, ' ')
      .substr(0, 16)

    return dateString
  }
  renderForcast() {
    let data = Object.values(this.state.items)
    var arr = []
    for (var k in data[3]) {
      let val = data[3][k].parameters.filter(el => el.unit === 'Cel')
      arr.push({
        validTime: this.formatDateTime(data[3][k].validTime),
        temp: val[0].values
      })
    }

    return (
      <ul>
        {arr.map((n, index) => (
          <li key={index}>
            Date:{n.validTime} temp:{n.temp}&#8451;
          </li>
        ))}
      </ul>
    )
  }
  render() {
    if (this.state.error.length > 0)
      return <h1>Ops, something went wrong {this.state.error}</h1>
    if (this.state.cords[0] > 0)
      return (
        <div>
          Selected longitude <h3>{this.state.cords[0]}</h3> <br />
          Selected latitude <h3>{this.state.cords[1]}</h3> <br />
          Curent temperature:{this.renderCurentTemp()}
          <br />
          Forcast: {this.renderForcast()}
        </div>
      )

    return (
      <div>
        <h1>Weather Forecast </h1>
        <h3>Search for a city in sweden</h3>
      </div>
    )
  }
}

export default WeatherApi
