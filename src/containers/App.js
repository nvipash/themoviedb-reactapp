import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import SearchMovie from "./SearchMovie/SearchMovie";
import purple from '@material-ui/core/colors/purple';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import './App.css';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#11cb5f'
        },
        secondary: {
            main: purple[400]
        }
    }
});

export default class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <BrowserRouter>
                    <div className="App">
                        <SearchMovie/>
                    </div>
                </BrowserRouter>
            </MuiThemeProvider>
        );
    }
}