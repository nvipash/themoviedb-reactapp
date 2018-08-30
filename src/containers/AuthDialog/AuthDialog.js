import React, {Component} from 'react';
import {Redirect} from 'react-router';
import ReactDOM from 'react-dom';
import purple from '@material-ui/core/colors/purple';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import {Button, TextField, Dialog, DialogActions, DialogContent} from '@material-ui/core/';

import {auth} from '../../features/Authentication/firebase';
import SnackBar from '../../components/SnackBar/SnackBar';

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
        promise.catch(error => {
            this.setState(prevState => ({openSnackBar: !prevState.openSnackBar}));
            const snackBarSentToEmail = <SnackBar
                open={this.state.openSnackBar}
                message={error.message}/>;
            ReactDOM.render(snackBarSentToEmail, document.getElementById('snack-bar'));
        });
        // this.setState({open: false, redirect: true});
    }

    onClickSignUp = () => {
        const promise = auth.createUserWithEmailAndPassword(this.state.email, this.state.password).then();
        promise.catch(error => {
            this.setState(prevState => ({openSnackBar: !prevState.openSnackBar}));
            const snackBarSentToEmail = <SnackBar
                onClose={this.onClickSignUp}
                open={this.state.openSnackBar}
                message={error.message}/>;
            ReactDOM.render(snackBarSentToEmail, document.getElementById('snack-bar'));
        });
        auth.onAuthStateChanged(user => {
            if (user) {
                user.sendEmailVerification().then(() => {
                        this.setState(prevState => ({openSnackBar: !prevState.openSnackBar}));
                        const snackBarSentToEmail = <SnackBar
                            onClose={this.onClickSignUp}
                            open={this.state.openSnackBar}
                            message={`Verification email sent to ${user.email}`}/>;
                        ReactDOM.render(snackBarSentToEmail, document.getElementById('snack-bar'));
                    })
                    .catch(error => {
                        this.setState(prevState => ({openSnackBar: !prevState.openSnackBar}));
                        const snackBarError = <SnackBar
                            onClose={this.onClickSignUp}
                            open={this.state.openSnackBar}
                            message={error.message}/>;
                        ReactDOM.render(snackBarError, document.getElementById('snack-bar'));
                    })
            }
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to="/"/>;
        }

        return (
            <div>
                <Dialog
                    id="auth"
                    open={this.state.openAuthDialog}
                    onClose={this.onClickCancel}
                    aria-labelledby="form-dialog-title">
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
                        <Button variant="outlined" onClick={this.onClickCancel} color="default">
                            Close
                        </Button>
                        <Button variant="outlined" onClick={this.onClickSignUp} color="default">
                            Sign Up
                        </Button>
                        <Button variant="contained" onClick={this.onClickSignIn} color="secondary">
                            Sign in
                        </Button>
                    </DialogActions>
                </Dialog>
                <div id='snack-bar'/>
            </div>
        );
    }
}