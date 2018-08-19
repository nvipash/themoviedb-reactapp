import React from 'react';
import {Route, Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Search from '@material-ui/icons/Search';
import TextField from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountIcon from '@material-ui/icons/AccountCircle';
import Tooltip from '@material-ui/core/Tooltip';
import purple from '@material-ui/core/colors/purple';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';

import AuthDialog from '../../AuthDialog/AuthDialog';

const styles = {
    flex: {
        flexGrow: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    }
};

const theme = createMuiTheme({
    palette: {
        primary: {
            main: purple[500]
        }
    }
});

const ApplicationBar = ({classes, ...props}) => (
    <div className={classes.flex}>
        <AppBar color="primary" position="fixed">
            <Toolbar>
                <IconButton className={classes.menuButton} aria-label="Menu">
                    <MenuIcon/>
                </IconButton>
                <Typography variant="title" align="justify" className={classes.flex}>
                    The Movie Database API React app
                </Typography>
                <MuiThemeProvider theme={theme}>
                    <TextField
                        className="movie-input"
                        placeholder="Search movie to watch"
                        value={props.value}
                        id="mui-theme-provider-input"
                        label="MuiThemeProvider"
                        onChange={props.onChange}
                        startAdornment={
                            <InputAdornment position="start"> 
                                <Search/> 
                            </InputAdornment>}>
                        </TextField>
                </MuiThemeProvider>
                <Tooltip disableFocusListener disableTouchListener title="Login with Firebase SDK">
                    <IconButton component={Link} to={`/login`} aria-label="Login">
                        <Route path={'/login'} exact component={AuthDialog}/>
                    <AccountIcon/>
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </AppBar>
    </div>
);

ApplicationBar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ApplicationBar);