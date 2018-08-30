import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import axios from 'axios';
import {Card, CardActions, CardContent, Typography, Button} from '@material-ui/core/';

import emptyImage from '../../images/empty_image.png'
import LearnMoreDialog from './../LearnMoreDialog/LearnMoreDialog';
import ApplicationBar from './ApplicationBar/ApplicationBar';
import './SearchMovie.css';

export default class SearchMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: []
        };
    }

    onSearchEnteredMovie = (event) => {
        this.enteredMovie = event.target.value;
        axios
            .get(`https://api.themoviedb.org/3/search/movie?api_key=6fb03dacf22ba1a33f234622a7a2dbcf&language=en-US&query=${this.enteredMovie}`)
            .then(response => {
                this.setState({results: response.data.results});
            })
            .catch(error => {
                console.log(error.response)
            });
    }

    render() {
        const card = {
            display: 'inline-block',
            margin: '10px 10px',
            position: 'relative',
            maxWidth: 325,
            maxHeight: 1000,
            maxLength: 300
        };

        return (
            <div>
                <ApplicationBar value={this.state.enteredMovie} onChange={this.onSearchEnteredMovie}/> 
                {this.state.results.map((results) => (
                        <Card style={card} key={results.id}>
                            {results.backdrop_path != null
                                ? <img src={`https://image.tmdb.org/t/p/w500${results.backdrop_path}`}
                                    alt='Movie Backdrop'/>
                                : <img src={emptyImage} alt='Not available'/>}
                            <CardContent>
                                <Typography gutterBottom variant="title">
                                    {results.title}
                                </Typography>
                                <Typography gutterBottom noWrap>
                                    {results.overview}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button component={Link} to={`/movie/${results.id}`} size="small" color="secondary">
                                    Learn More
                                    <Route
                                        path={`/movie/${results.id}`}
                                        render={(props) => <LearnMoreDialog {...props} movieId={results.id}/>}/>
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
            </div>
        );
    }
}