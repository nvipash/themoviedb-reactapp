import React, { Component } from 'react';
// import { MDCRipple } from '@material/ripple';
import Search from "../components/SearchMovie";
import tmdbLogo from '../images/tmdb-logo.svg';
import reactLogo from '../images/react.svg';
import './App.css';

// const ripple = new MDCRipple(document.querySelector('.foo-button'));
// var url = '' 

class App extends Component {
  render() {
    return (
      <div className="App">
        <img className="tmdb-logo" src={tmdbLogo} alt="Site based on TMDb API" /> 
        <img className="react-logo" src={reactLogo} alt="Site based on TMDb API" /> 
        <p>TMDb API REACT APP 0.1</p>
        <Search />
      </div>
    );
  }
}

export default App;