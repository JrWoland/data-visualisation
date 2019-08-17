import React from 'react';
import './App.css';
import Population from './components/population/Population';

const path = 'https://datahub.io/core/population/r/population.json';
const prefix = "https://cors-anywhere.herokuapp.com/";
class App extends React.Component {

  state = {
    population: 'POL',
    populationData: []
  }

  getData = () => {
    fetch(prefix + path)
      .then(res => res.json())
      .then(data => this.parsePopulationData(data))
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

  render() {
    console.log(this.state);


    return (
      <div className="App">
        <header onClick={this.getData}>Data Dashboard</header>
        <Population data={this.state} />
      </div>
    );
  }
}

export default App;
