import React from 'react';
import './App.css';
import countriesJSON from './components/cities/countriesSouthAmerica.json'
import Population from './components/population/Population';
import Currency from './components/currency/Currency';
import PopulationMixed from './components/populationmixed/Population-mixed';
import Geomap from './components/geomap/Geomap';
import Cities from './components/cities/Cities';

const pathPopulation = 'https://datahub.io/core/population/r/population.json';
const pathCountryCodes = 'https://datahub.io/core/country-codes/r/country-codes.json';
const pathCities = 'https://datahub.io/core/world-cities/r/world-cities.json';
const prefix = "https://cors-anywhere.herokuapp.com/";
class App extends React.Component {

  state = {
    populationDataWorld: [],
    populationDataPL: [],
    populationDataUSA: [],
    populationDataEUU: [], //Euro area
    populationDataARB: [], //Arab world
    currencyData: [],
    numberOfCountries: 0,
    numberOfCountriesIndependent: 0,
    numberOfCountriesWithEURCurrency: 0,
    cities: []
  }

  getData = () => {
    fetch(prefix + pathPopulation)
      .then(res => res.json())
      .then(data => {
        this.setState({
          populationDataPL: this.parsePopulationData(data, 'POL'),
          populationDataUSA: this.parsePopulationData(data, 'USA'),
          populationDataEUU: this.parsePopulationData(data, 'EUU'),
          populationDataARB: this.parsePopulationData(data, 'ARB'),
          populationDataWorld: this.parseWorlGeoPopulation(data)
        })
      })
      .catch(err => console.log(err));

    fetch(prefix + pathCountryCodes)
      .then(res => res.json())
      .then(data => this.parseCurrencyData(data))
      .catch(err => console.log(err))

    fetch(prefix + pathCities)
      .then(res => res.json())
      .then(data => this.setState({ cities: this.parseNumbersOfCities(data) }))
      .catch(err => console.log(err))
  }

  parseNumbersOfCities = (data) => {
    let namesOfCountries = countriesJSON.map(item => item = item["CLDR display name"]);
    let numbersOfCities = [];
    namesOfCountries.forEach(country => {
      let number = data.filter(item => item['country'] === country)
      numbersOfCities.push({
        country: country,
        cities: number.length
      })
    });
    return numbersOfCities;
  }

  parseWorlGeoPopulation = (data, year = 2016) => {
    const populationData = data.filter(item => item['Year'] === year);
    const parsedData = [];

    populationData.forEach(element => {
      parsedData.push({
        'id': element['Country Code'],
        'value': element.Value
      })
    });

    return parsedData;
  }

  parsePopulationData = (data, countryCode) => {
    const populationData = data.filter(item => item['Country Code'] === countryCode);
    const parsedData = [];

    populationData.forEach(element => {
      parsedData.push({
        'x': element.Year,
        'y': element.Value / 1000000
      })
    });
    return parsedData;
  }

  parseCurrencyData = (data) => {
    const currencyFilter = data.filter(country => country['ISO4217-currency_alphabetic_code'] !== null);
    const currency = []
    const countCurrency = {};
    const parsedData = [];

    currencyFilter.forEach(country => {
      currency.push(country['ISO4217-currency_alphabetic_code'])
    });

    currency.forEach(curr => {
      if (!countCurrency.hasOwnProperty(curr)) {
        countCurrency[curr] = 0;
      }
      countCurrency[curr]++;
    })

    for (const key in countCurrency) {
      if (countCurrency.hasOwnProperty(key)) {
        if (countCurrency[key] === null) {
          return
        } else {
          parsedData.push({ currencyCode: key, currency: countCurrency[key] });
        }
      }
    }
    this.setState({
      currencyData: parsedData,
      numberOfCountries: data.filter(country => country['CLDR display name']).length,
      numberOfCountriesIndependent: data.filter(country => country['is_independent'] === 'Yes').length,
      numberOfCountriesWithEURCurrency: currencyFilter.filter(country => country['ISO4217-currency_alphabetic_code'] === 'EUR').length
    })
  }

  componentDidMount = () => {
    this.getData();
  }

  render() {

    return (
      <>
        <header><h1>Data Dashboard</h1></header>
        <div className="App">
          <Population data={this.state} />
          <Currency data={this.state} sortBy={this.state.sortChartBy} />
          <PopulationMixed data={this.state} />
          <Cities data={this.state} />
          <Geomap data={this.state} />
        </div>
      </>
    );
  }
}

export default App;
