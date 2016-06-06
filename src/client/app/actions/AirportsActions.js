import React from 'react'
import alt from '../alt.js'

import airports from '../sources/airports.json'

class AirportsActions {
  airportsRequest() {
    // mimic fetch request
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve(airports)
      }, 250)
    })
  }

  fetchAirports() {
    return (dispatch) => {
      dispatch()
      this.airportsRequest()
        .then(response => {
          this.updateAirports(response)
        }).catch(err => {
          this.fetchFailed(err)
        })
    }
  }

  updateAirports(res) {
    return res
  }

  fetchFailed(err) {
    return err
  }
}

export default alt.createActions(AirportsActions)
