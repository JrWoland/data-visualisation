import React from 'react';
import './App.css';
import Population from './components/population/Population';

const path = 'https://datahub.io/core/population/r/population.json';
const prefix = "https://cors-anywhere.herokuapp.com/";
class App extends React.Component {
  
  state = {
    
  }

getData = () =>{
  fetch(prefix + path)
  .then(res=> res.json())
  .then(data=> console.log(data[400]))

}

  render(){


    return (
      <div onClick={this.getData} className="App">
        <Population />
      </div>
    );
  }
}

export default App;
