import React from 'react';
import PropTypes from 'prop-types';
import {withStyles, createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Search from '@material-ui/icons/Search';
import TextField from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import cyan from "@material-ui/core/colors/cyan";
import MenuIcon from '@material-ui/icons/Menu';
import AccountIcon from '@material-ui/icons/AccountCircle';

const styles = {
    root: {
        flexGrow: 1
    },
    appBar: {
        background: '#B2FF59'
    },
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
      primary: cyan
    }
});

const ButtonAppBar = (props) => {
    const {classes} = props;
    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton className={classes.menuButton} color="black" aria-label="Menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="title" align="justify" color="black" className={classes.flex}>
                        The Movie Database API React app v0.1
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
                    <IconButton color="black" aria-label="Login">
                    <AccountIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
}

ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonAppBar);