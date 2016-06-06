import alt from '../alt'
import AirportsActions from '../actions/AirportsActions'

class AirportsStore {
  constructor() {
    this.state = {
      loading: true,
      airports: [],
      passengersRange: [],
      countries: [],
      countriesRange: []
    }

    this.bindListeners({
      onFetchAirports: AirportsActions.FETCH_AIRPORTS,
      onUpdateAirports: AirportsActions.UPDATE_AIRPORTS
    })
  }

  onFetchAirports() {
    this.setState({ loading: true })
  }

  onUpdateAirports(airports) {
    airports.sort((a, b) => b.Passengers - a.Passengers)

    let passengersRange = [airports[airports.length - 1].Passengers,
                          airports[0].Passengers]

    this.setState({
      loading: false,
      airports,
      passengersRange
    })

    this.setCountries()
  }

  setCountries() {
    let { airports } = this.state

    let countriesPluck = airports.map( ({ Country }) => Country )
    let countriesList = [...new Set(countriesPluck)]

    let countries = countriesList.map(country => {
      let items = []

      airports.forEach(airport => {
        if (airport.Country === country) {
          items.push(airport)
        }
      })

      return {
        name: country,
        airports: items
      }
    })

    countries.sort((a, b) => b.airports.length - a.airports.length)

    let countriesRange = [countries[countries.length - 1].airports.length,
                          countries[0].airports.length]

    this.setState({ countries, countriesRange })
  }
}

export default alt.createStore(AirportsStore, 'AirportsStore')
