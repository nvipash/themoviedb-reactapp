import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import ReactDOM from 'react-dom';
import AccountIcon from '@material-ui/icons/AccountCircle';
import {IconButton, Tooltip, Menu, MenuItem} from '@material-ui/core/';

import AuthDialog from '../../containers/AuthDialog/AuthDialog';
import {auth} from '../../features/Authentication/firebase';
import SnackBar from '../SnackBar/SnackBar';

export default class LoginIconButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null
        };
    }

    onClickIconButton = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    onCloseMenu = () => {
        this.setState({anchorEl: null});
    };

    onCLickLogout = () => {
        if (auth.signOut()) {
            this.setState(prevState => ({
                openSnackBar: !prevState.openSnackBar
            }));
            const snackBarLogIn = <SnackBar
                onClose={this.authCheckerWhenPageLoaded}
                open={this.state.openSnackBar}
                message={"You're logged out"}/>;
            ReactDOM.render(snackBarLogIn, document.getElementById('snack-bar'));
            this.setState({anchorEl: null});
        }
    }

    render() {
        return (
            <div>
                <Tooltip
                    disableFocusListener={true}
                    disableTouchListener={true}
                    title="Login with Firebase SDK">
                    <IconButton
                        aria-owns={this.state.anchorEl
                        ? 'auth-menu'
                        : null}
                        aria-haspopup="true"
                        onClick={this.onClickIconButton}>
                        <AccountIcon/>
                    </IconButton>
                </Tooltip>
                <Menu
                    id="auth-menu"
                    anchorEl={this.state.anchorEl}
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.onCloseMenu}>
                    <MenuItem component={Link} to={`/login`} aria-label="Login">
                        <Route  path={'/login'} exact component={AuthDialog}/>Sign in</MenuItem>
                    <MenuItem onClick={this.onCLickLogout}>Sign out</MenuItem>
                </Menu>
            </div>
        );
    }
}