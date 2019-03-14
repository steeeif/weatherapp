import React, { Component } from 'react'
import ReactGoogleMapLoader from 'react-google-maps-loader'
import ReactGooglePlacesSuggest from 'react-google-places-suggest'

const API_KEY = 'AIzaSyBK40LLUPVBLxLYwFyD56ihMDJ1NHmyMUA'
class GoogleSuggest extends Component {
  state = {
    search: '',
    value: '',
    isLoaded: true,
    items: '',
    lon: '',
    lat: ''
  }

  handleInputChange(e) {
    this.setState({ search: e.target.value, value: e.target.value })
  }

  handleSelectSuggest(suggest) {
    console.log(suggest.geometry.viewport.ga.l.toFixed(6))
    console.log(suggest.geometry.viewport.ma.l.toFixed(6))
    if (suggest.address_components[2].short_name !== 'SE') {
      console.log('Please chose a valid city')
    }

    this.setState({
      lon: suggest.geometry.viewport.ga.l.toFixed(6),
      lat: suggest.geometry.viewport.ma.l.toFixed(6)
    })
  }

  render() {
    const { search, value } = this.state
    return (
      <div>
        <ReactGoogleMapLoader
          params={{
            key: API_KEY,
            libraries: 'places,geocode'
          }}
          render={googleMaps =>
            googleMaps && (
              <div>
                <ReactGooglePlacesSuggest
                  autocompletionRequest={{ input: search }}
                  googleMaps={googleMaps}
                  onSelectSuggest={this.handleSelectSuggest.bind(this)}
                >
                  <input
                    className="form-control"
                    type="text"
                    value={value}
                    placeholder="Search a location"
                    onChange={this.handleInputChange.bind(this)}
                  />
                </ReactGooglePlacesSuggest>
              </div>
            )}
        />

        <h1> hello world</h1>
      </div>
    )
  }
}

export default GoogleSuggest
