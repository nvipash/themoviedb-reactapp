import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import ReactDOM from 'react-dom';
import purple from '@material-ui/core/colors/purple';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';

import {auth} from '../features/Authentication/firebase';
import SnackBar from '../components/SnackBar/SnackBar'
import SearchMovie from "./SearchMovie/SearchMovie";
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
    constructor(props) {
        super(props);
        this.state = {
            openSnackBar: false
        };
    }

    authCheckerWhenPageLoaded = () => {
        auth.onAuthStateChanged(user => {
            if (user) {
                this.setState(prevState => ({openSnackBar: !prevState.openSnackBar}));
                const snackBarLogged = <SnackBar
                    onClose={this.authCheckerWhenPageLoaded}
                    open={this.state.openSnackBar}
                    message={`You're logged as ${user.email}`}/>;
                ReactDOM.render(snackBarLogged, document.getElementById('snack-bar'));
            } else {
                this.setState(prevState => ({openSnackBar: !prevState.openSnackBar}));
                const snackBarLogIn = <SnackBar
                    onClose={this.authCheckerWhenPageLoaded}
                    open={this.state.openSnackBar}
                    message={'Log in to the site'}/>;
                ReactDOM.render(snackBarLogIn, document.getElementById('snack-bar'));
            }
        })
    };

    componentWillMount() {
        this.authCheckerWhenPageLoaded();
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <BrowserRouter>
                    <div className="App">
                        <SearchMovie/>
                        <div id='snack-bar'/>
                    </div>
                </BrowserRouter>
            </MuiThemeProvider>
        );
    }
}