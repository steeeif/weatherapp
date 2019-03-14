import React, { Component } from 'react'
import ReactGoogleMapLoader from 'react-google-maps-loader'
import ReactGooglePlacesSuggest from 'react-google-places-suggest'

const API_KEY = 'AIzaSyBK40LLUPVBLxLYwFyD56ihMDJ1NHmyMUA'

class GoogleSuggest extends Component {
  state = {
    search: '',
    value: ''
  }

  handleChange(lon, lat) {
    this.props.onNewCordsSet([lon, lat])
  }
  handleInfo(info) {
    this.props.onWrongCitySelected([info])
  }
  handleInputChange(e) {
    this.setState({ search: e.target.value, value: e.target.value })
  }

  handleSelectSuggest(suggest) {
    try {
      if (suggest.address_components[2].short_name !== 'SE') {
        this.handleInfo('Please chose a valid city')
      } else {
        this.handleInfo(suggest.address_components[2].long_name)

        this.handleChange(
          Math.floor(suggest.geometry.viewport.ga.l * 1000000) / 1000000,
          Math.floor(suggest.geometry.viewport.ma.l * 1000000) / 1000000
        )
      }

      this.setState({ search: '', value: suggest.formatted_address })
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const { search, value } = this.state
    return (
      <ReactGoogleMapLoader
        params={{
          key: API_KEY,
          libraries: 'places,geocode'
        }}
        render={(googleMaps, error) =>
          googleMaps ? (
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
          ) : (
            <div>
              {/*Check for network error so loading state ends if user lost connection.*/}
              {error === 'Network Error' ? <p>{error}</p> : <p>isLoading...</p>}
            </div>
          )}
      />
    )
  }
}

export default GoogleSuggest
