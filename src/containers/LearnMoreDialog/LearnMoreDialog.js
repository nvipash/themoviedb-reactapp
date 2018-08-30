import React, {Component} from 'react';
import {Redirect} from 'react-router';
import axios from 'axios';
import PropTypes from 'prop-types';
import ArrowBack from '@material-ui/icons/ArrowBack';
import {IconButton, Dialog, DialogContentText, DialogContent, AppBar, Toolbar, Typography, withMobileDialog} from '@material-ui/core/';

import emptyImage from '../../images/empty_image.png'
import "./LearnMoreDialog.css"

class LearnMoreDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genres: [],
            production_companies: [],
            open: true
        };
    }

    apiMovieRequest = () => {
        axios
            .get(`https://api.themoviedb.org/3${this.props.location.pathname}?api_key=6fb03dacf22ba1a33f234622a7a2dbcf&language=en-US`)
            .then(response => {
                this.setState({
                    title: response.data.title,
                    poster_path: response.data.poster_path,
                    overview: response.data.overview,
                    release_date: response.data.release_date,
                    genres: response.data.genres,
                    status: response.data.status,
                    vote_average: response.data.vote_average,
                    vote_count: response.data.vote_count,
                    runtime: response.data.runtime,
                    production_companies: response.data.production_companies,
                    budget: response.data.budget
                });
            })
    }

    onCloseDialog = () => {
        this.setState({open: false, redirect: true});
    }

    componentDidMount() {
        this.apiMovieRequest();
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to="/"/>;
        }
        const {fullScreen} = this.props;
        const styles = {
            arrowBack: {
                position: 'left',
                marginLeft: -12,
                marginRight: 20
            }
        }

        return (
            <div>
                <Dialog
                    fullScreen={fullScreen}
                    open={this.state.open}
                    onClose={this.onCloseDialog}
                    aria-labelledby="responsive-dialog-title">
                    <AppBar position="static" color="primary">
                        <Toolbar>
                            <IconButton
                                onClick={this.onCloseDialog}
                                style={styles.arrowBack}
                                aria-label="Back">
                                <ArrowBack/>
                            </IconButton>
                            <Typography variant="title" align="justify">
                                {this.state.title}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <DialogContentText component="div">
                        <DialogContent>
                            {this.state.poster_path != null
                                ? <img
                                        className="poster"
                                        src={`https://image.tmdb.org/t/p/w500${this.state.poster_path}`}
                                        alt='Movie Poster'/>
                                : <img className="poster" src={emptyImage} alt='Not available'/>}
                            <Typography variant="subheading" gutterBottom>
                                <b>Genres: </b> 
                                {this.state.genres.map(genres => genres.name).join(', ')}</Typography>
                            <Typography variant="subheading" gutterBottom>
                                <b>Overview: </b>
                                {this.state.overview}</Typography>
                            <Typography variant="subheading" gutterBottom>
                                <b>Release data: </b>
                                {this.state.release_date}</Typography>
                            <Typography variant="subheading" gutterBottom>
                                <b>Status: </b>
                                {this.state.status}</Typography>
                            <Typography variant="subheading" gutterBottom>
                                <b>Average vote: </b>
                                {this.state.vote_average}/10 ({this.state.vote_count} votes)</Typography>
                            <Typography variant="subheading" gutterBottom>
                                <b>Production companies: </b>
                                {this.state.production_companies
                                    .map(production_companies => production_companies.name)
                                    .join(', ')}</Typography>
                            <Typography variant="subheading" gutterBottom>
                                <b>Runtime: </b>
                                {this.state.runtime} minutes</Typography>
                            <Typography variant="subheading" gutterBottom>
                                <b>Budget: </b>
                                {this.state.budget === 0 ? "-" : `$${this.state.budget}`}</Typography>
                        </DialogContent>
                    </DialogContentText>
                </Dialog>
            </div>
        );
    }
}

LearnMoreDialog.propTypes = {
    fullScreen: PropTypes.bool.isRequired
};

export default withMobileDialog()(LearnMoreDialog);