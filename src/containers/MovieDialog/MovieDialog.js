import React, {Component} from 'react';
import {Redirect} from 'react-router';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import emptyImage from '../../images/empty_image.png'
import "./MovieDialog.css"

class MovieDialog extends Component {
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
            title: {
                background: '#B2FF59'
            },
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
                    <DialogTitle id="alert-dialog-slide-title" style={styles.title}>
                        <IconButton onClick={this.onCloseDialog} style={styles.arrowBack} aria-label="Back">
                            <ArrowBack/>
                        </IconButton>
                        <span/>
                        <b>
                            {this.state.title}
                        </b>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                        {this.state.poster_path != null ? <img
                                className="poster"
                                src={`https://image.tmdb.org/t/p/w500${this.state.poster_path}`}
                                alt='Movie Poster'/> : <img className="poster" src={emptyImage} alt='Not available'/>}
                            <p>
                                <b>Genres: </b>
                                {this
                                    .state
                                    .genres
                                    .map(genres => genres.name)
                                    .join(', ')}</p>
                            <p>
                                <b>Overview: </b>{this.state.overview}</p>
                            <p>
                                <b>Release data: </b>{this.state.release_date}</p>
                            <p>
                                <b>Status: </b>{this.state.status}</p>
                            <p>
                                <b>Average vote: </b>{this.state.vote_average}/10 ({this.state.vote_count} votes)</p>
                            <p>
                                <b>Production companies: </b>
                                {this
                                    .state
                                    .production_companies
                                    .map(production_companies => production_companies.name)
                                    .join(', ')}</p>
                            <p> 
                                <b>Runtime: </b>{this.state.runtime} minutes</p>
                            <p> 
                                <b>Budget: </b>${this.state.budget}</p>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

MovieDialog.propTypes = {
    fullScreen: PropTypes.bool.isRequired
};

export default withMobileDialog()(MovieDialog);