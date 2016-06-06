import React from 'react'

import { Map, CircleMarker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet_css'
import "leaflet_marker"
import "leaflet_marker_2x"
import "leaflet_marker_shadow"
import './AirportsMap.scss'
import { scaleValue } from '../utils'

export default class AirportsMap extends React.Component {
  renderAirportMarker(airport, i) {
    let { passengersRange } = this.props

    let position = airport['Coordinates (Lat, Lng)'].split(',')
    let domain = [4, 40]
    let radius = scaleValue(passengersRange, domain, airport.Passengers)

    return (
      <CircleMarker className="airport-marker"
                    key={`airport-marker-${i}`}
                    center={[+position[0], +position[1]]}
                    radius={radius}>
        <Popup className="airport-popup">
          <div className="popup-content">
            <p className="popup-name">{airport.Name}</p>
            <p className="popup-country">{airport.City}, {airport.Country}</p>
            <p className="popup-passengers">{airport.Passengers.toLocaleString()} passengers</p>
            <p className="popup-rank">Rank {airport.Rank}</p>
          </div>
        </Popup>
      </CircleMarker>
    )
  }

  render () {
    let { airports } = this.props
    const position = [20.0, 5.0]

    return (
      <Map center={position} zoom={2}>
        <TileLayer url='http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
                   attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://cartodb.com/attributions">CartoDB</a>'
        />
        {airports.map((airport, i) => this.renderAirportMarker(airport, i))}
      </Map>
    )
  }
}
