import React from 'react';
import './App.css';
import Population from './components/population/Population';
import Currency from './components/currency/Currency';

const pathPopulation = 'https://datahub.io/core/population/r/population.json';
const pathCountryCodes = 'https://datahub.io/core/country-codes/r/country-codes.json';
const prefix = "https://cors-anywhere.herokuapp.com/";
class App extends React.Component {

  state = {
    population: 'POL',
    populationData: [],
    currencyData: [],
    numberOfCountries: 0,
    numberOfCountriesIndependent: 0,
    numberOfCountriesWithEURCurrency: 0
  }

  getData = () => {
    fetch(prefix + pathPopulation)
      .then(res => res.json())
      .then(data => this.parsePopulationData(data))
      .catch(err => console.log(err));

    fetch(prefix + pathCountryCodes)
      .then(res => res.json())
      .then(data => this.parseCurrencyData(data))
      .catch(err => console.log(err))
  }


  parsePopulationData = (data) => {
    const populationData = data.filter(item => item['Country Code'] === this.state.population);
    const parsedData = [];

    populationData.forEach(element => {
      parsedData.push({
        'x': element.Year,
        'y': element.Value / 1000000
      })
    });
    this.setState({
      populationData: parsedData
    })
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
        </div>
      </>
    );
  }
}

export default App;
