import React from 'react';
import PropTypes from 'prop-types';
import {Link, Route} from 'react-router-dom';
import {Search, Menu} from '@material-ui/icons/';
import purple from '@material-ui/core/colors/purple';
import {AppBar, Toolbar, Input, InputAdornment, IconButton} from '@material-ui/core/';
import {withStyles, createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';

import LogicIconButton from '../../../components/LoginIconButton/LoginIconButton'
import Drawer from '../../../components/Drawer/Drawer'

const styles = {
    flex: {
        flexGrow: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 5
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
                <IconButton component={Link} to={`/drawer`} aria-label="Drawer" className={classes.menuButton}>
                    <Route path={'/drawer'} exact component={Drawer}/><Menu/>
                </IconButton>
                <MuiThemeProvider theme={theme}>
                    <Input
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
                        </Input>
                </MuiThemeProvider>
                <LogicIconButton />
            </Toolbar>
        </AppBar>
    </div>
);

ApplicationBar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ApplicationBar);