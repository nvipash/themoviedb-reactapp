import React, { Component } from 'react';

import SearchMovie from "./SearchMovie/SearchMovie";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SearchMovie />
      </div>
    );
  }
}

export default App;