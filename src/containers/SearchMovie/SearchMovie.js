import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import cyan from "@material-ui/core/colors/cyan";

import classes from './SearchMovie.css';
import MovieDialog from '../MovieDialog/MovieDialog';
import ApplicationBar from './ApplicationBar/ApplicationBar';

export default class SearchMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            open: false
        };
        this.apiUrl = 'https://api.themoviedb.org/3/search/movie?api_key=6fb03dacf22ba1a33f234622a7a2db' +
                'cf&language=en-US&query=';
        this.imageUrl = 'https://image.tmdb.org/t/p/w500/';
    }

    apiSearchRequest = () => {
        axios
            .get(this.movieRequest)
            .then(response => {
                this.setState({results: response.data.results});
            })
    }

    inputSearchHandler = (event) => {
        this.inputQuery = event.target.value;
        this.movieRequest = this.apiUrl + this.inputQuery;
        this.setState({movieRequest: this.inputQuery})
        this.componentDidMount();
    }

    getMoviePoster = (event) => {
        this.posterImage = event.target.value;
        this.movieRequest = this.imageUrl + this.posterImage;
        this.setState({imageUrl: this.posterImage})
        this.componentDidMount();
        axios
            .get(this.imageUrl)
            .then(response => {
                this.setState({results: response.data.results});
            })
    }

    handleClickLearnMore = () => {
        this.setState({open: true});
    };

    componentDidMount = () => {
        this.apiSearchRequest();
    }

    render() {
        const card = {
            display: 'inline-block',
            margin: '20px',
            position: 'relative',
            maxWidth: 345,
            maxHeight: 800
        };

        const theme = createMuiTheme({
            palette: {
                primary: cyan
            }
        });

        return (
            <div>
                <ApplicationBar value={this.inputQuery} onChange={this.inputSearchHandler}/> 
                {this
                    .state
                    .results
                    .map(results => (
                        <Card style={card}>
                            <img
                                src={this.imageUrl + results.backdrop_path}
                                onChange={this.getMoviePoster}
                                alt='Movie Poster'/>
                            <CardContent>
                                <Typography gutterBottom variant="headline" component="h2">
                                    {results.title}
                                </Typography>
                                <Typography component="p">
                                    <p className={classes.overview}>
                                        {results.overview}
                                    </p>
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <MuiThemeProvider theme={theme}>
                                    <Link
                                        to={`/${results.id}`}
                                        style={{
                                        textDecoration: 'none'
                                    }}>
                                        <Button size="small" color="primary" onClick={this.handleClickOpen}>
                                            Learn More
                                            <Route
                                                path={`/${results.id}`}
                                                render={(props) => <MovieDialog {...props} movieId={results.id}/>}/>
                                        </Button>
                                    </Link>
                                </MuiThemeProvider>
                            </CardActions>
                        </Card>
                    ))}
            </div>
        );
    }
}