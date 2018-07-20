import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import SearchMovie from "./SearchMovie/SearchMovie";
import './App.css';

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <SearchMovie/>
                </div>
            </BrowserRouter>
        );
    }
}