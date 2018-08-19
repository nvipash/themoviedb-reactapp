import React, {Component} from 'react';
import {Redirect} from 'react-router';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import purple from '@material-ui/core/colors/purple';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';

import SnackBar from '../../components/SnackBar/SnackBar'
import {auth} from '../../features/Authentication/firebase'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: purple[500]
        }
    }
});

export default class AuthDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openAuthDialog: true,
            openSnackBar: false,
            email: '',
            password: ''
        };
        this.onInputedEmailAndPassword = this.onInputedEmailAndPassword.bind(this);
    }

    onInputedEmailAndPassword = (event) => {
        this.setState({[event.target.id]: event.target.value});
    };

    onClickCancel = () => {
        this.setState({openAuthDialog: false, redirect: true});
    };

    onClickSignIn = () => {
        const promise = auth.signInWithEmailAndPassword(this.state.email, this.state.password);
        promise.catch(error => console.log(error.message));
        // this.setState({open: false, redirect: true});
    }

    onClickSignUp = () => {
        const promise = auth.createUserWithEmailAndPassword(this.state.email, this.state.password);
        promise.catch(error => console.log(error.message));
    }

    onCLickSignOut = () => {
        auth.signOut();
        this.setState(prevState => ({openSnackBar: !prevState.openSnackBar}));
        // this.setState({open: false, redirect: true});
    }

    realtimeAuthChecker = () => {
        auth.onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                console.log(firebaseUser);
            } else {
                console.log("User not logged in")
            }
        })
    };

    componentWillMount() {
        this.realtimeAuthChecker();
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to="/"/>;
        }

        return (
            <div id='root'>
                <Dialog
                    id="auth"
                    open={this.state.openAuthDialog}
                    onClose={this.onClickCancel}
                    aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Login</DialogTitle>
                    <DialogContent>
                        <MuiThemeProvider theme={theme}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="email"
                                label="Email"
                                onChange={this.onInputedEmailAndPassword}
                                fullWidth/>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="password"
                                label="Password"
                                type="password"
                                onChange={this.onInputedEmailAndPassword}
                                fullWidth/>
                        </MuiThemeProvider>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.onCLickSignOut} color="secondary">
                            Sign Out
                        </Button>
                        <Button onClick={this.onClickCancel} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={this.onClickSignIn} color="secondary">
                            Log in
                        </Button>
                        <Button onClick={this.onClickSignUp} color="secondary">
                            Sign Up
                        </Button>
                    </DialogActions>
                </Dialog>
                <SnackBar onClose={this.onClickSignOut} open={this.state.openSnackBar} text={"You're signed out"}/>
            </div>
        );
    }
}