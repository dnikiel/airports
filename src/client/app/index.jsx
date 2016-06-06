import React from 'react'
import {render} from 'react-dom'

import AirportsMap from './components/AirportsMap.jsx'
import AirportsAside from './components/AirportsAside.jsx'
import './index.css'

import AirportsActions from './actions/AirportsActions'
import AirportsStore from './stores/AirportsStore'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = AirportsStore.getState()

    this.storeChanged = this.storeChanged.bind(this)
  }

  storeChanged(state) {
    this.setState(state)
  }

  componentDidMount() {
    AirportsStore.listen(this.storeChanged)
    AirportsActions.fetchAirports()
  }

  componentWillUnmount() {
    AirportsStore.unlisten(this.storeChanged)
  }

  render () {
    let { airports, passengersRange, countries, countriesRange } = this.state

    if (!airports.length) return <p>loading...</p>

    return (
      <div className="airports-app">
        <AirportsMap airports={airports} passengersRange={passengersRange} />
        <AirportsAside countries={countries} countriesRange={countriesRange} />
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'))
