import React, {Component} from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

class MovieDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genres: [],
            open: true
        };
    }

    apiMovieRequest = () => {
        axios
            .get(`https://api.themoviedb.org/3/movie${this.props.location.pathname}?api_key=6fb03dacf22ba1a33f234622a7a2dbcf&language=en-US`)
            .then(response => {
                this.setState({title: response.data.title, 
                    original_title: response.data.original_title, 
                    overview: response.data.overview, 
                    release_date: response.data.release_date, 
                    genres: response.data.genres});
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
            return <Redirect push to="/" />;
          }
        const arrowBack = {
            position: 'left'
        }
        const {fullScreen} = this.props;

        return (
            <div>
                <Dialog
                    fullScreen={fullScreen}
                    open={this.state.open}
                    onClose={this.onCloseDialog}
                    aria-labelledby="responsive-dialog-title">
                    <DialogTitle id="alert-dialog-slide-title">
                        <IconButton
                            onClick={this.onCloseDialog}
                            style={arrowBack}
                            color="black"
                            aria-label="Back">
                            <ArrowBack/>
                        </IconButton>
                        <span/>
                        <b>{this.state.title}</b>
                        ({this.state.original_title})
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <p>
                                <b>Genres: </b>
                                {this
                                    .state
                                    .genres
                                    .map(genres => genres.name)
                                    .join(', ')}</p>
                            <b>Overview: </b>{this.state.overview}
                            <p><b>Release data: </b>{this.state.release_date}</p>
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