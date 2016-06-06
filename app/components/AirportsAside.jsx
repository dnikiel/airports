import React from 'react'

import './AirportsAside.scss'
import { scaleValue } from '../utils'

export default class AirportsAside extends React.Component {
  renderCountryRow(country, i) {
    if (i >= 10) return

    let { countriesRange } = this.props
    let domain = [10, 100]

    let barStyles = {
      width: `${scaleValue(countriesRange, domain, country.airports.length)}%`
    }

    return (
      <div className="country-row" key={`country-row-${i}`}>
        <p className="country-name">{country.name}</p>
        <p className="country-airports">{country.airports.length}</p>
        <div className="row-right">
          <div className="country-bar" style={barStyles}></div>
        </div>
      </div>
    )
  }

  render () {
    let { countries } = this.props

    return (
      <div className="airports-aside">
        <h1 className="aside-title">The World's Busiest Airports</h1>
        <p className="aside-description">Number of Airports by Country</p>

        {countries.map((country, i) => this.renderCountryRow(country, i))}
      </div>
    )
  }
}
