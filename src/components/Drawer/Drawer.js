import React, {Component} from 'react';
import {Redirect} from 'react-router';
import PropTypes from 'prop-types';
import HomeIcon from '@material-ui/icons/Home';
import {withStyles} from '@material-ui/core/styles';
import {SwipeableDrawer, ListItem, ListItemIcon, ListItemText} from '@material-ui/core/';

const styles = {
    list: {
        width: 250
    },
    fullList: {
        width: 'auto'
    }
};

class Drawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            left: true
        };
    }

    toggleDrawer = (side, open) => () => {
        this.setState({[side]: open, redirect: true});
    };

    render() {
        if (this.state.redirect) {
            return <Redirect push to="/"/>;
        }
        const {classes} = this.props;
        const menuList = (
            <div className={classes.list}>
                <ListItem button onClick={this.toggleDrawer('left', false)}>
                    <ListItemIcon>
                        <HomeIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Home"/>
                </ListItem>
                <ListItem button
                    onClick={() => window.open("https://www.themoviedb.org/documentation/api", "_blank")}>
                    <ListItemIcon>
                        <img src={require('../../images/tmdb-logo.svg')} alt='TMDb'/>
                    </ListItemIcon>
                    <ListItemText primary="The Movie DB API"/>
                </ListItem>
                <ListItem button divider='true'
                    onClick={() => window.open("https://reactjs.org/", "_blank")}>
                    <ListItemIcon>
                        <img src={require('../../images/react.svg')} alt='React'/>
                    </ListItemIcon>
                    <ListItemText primary="Powered by React.js"/>
                </ListItem>
                <ListItem button 
                    onClick={() => window.open("https://github.com/nvipash/themoviedb-reactapp", "_blank")}>
                    <ListItemIcon>
                        <img src={require('../../images/github-icon.svg')} alt='GitHub'/>
                    </ListItemIcon>
                    <ListItemText primary="Github Sources"/>
                </ListItem>
            </div>
        );

        return (
            <div>
                <SwipeableDrawer
                    open={this.state.left}
                    onClose={this.toggleDrawer('left', false)}
                    onOpen={this.toggleDrawer('left', true)}>
                    <div tabIndex={0} role="button">
                        {menuList}
                    </div>
                </SwipeableDrawer>
            </div>
        );
    }
}

Drawer.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Drawer);