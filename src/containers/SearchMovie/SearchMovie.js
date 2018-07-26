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

import './SearchMovie.css';
import emptyImage from '../../images/empty_image.png'
import MovieDialog from './../MovieDialog/MovieDialog';
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
    }

    apiSearchRequest = () => {
        axios
            .get(this.apiUrlWithInput)
            .then(response => {
                this.setState({results: response.data.results});
            })
    }

    onSearchInput = (event) => {
        this.inputedMovie = event.target.value;
        this.apiUrlWithInput = this.apiUrl + this.inputedMovie;
        this.setState({apiUrlWithInput: this.inputedMovie})
        this.componentDidMount();
    }

    onClickLearnMore = () => {
        this.setState({open: true});
    };

    componentDidMount() {
        this.apiSearchRequest();
    }

    render() {
        const card = {
            display: 'inline-block',
            margin: '20px',
            position: 'relative',
            maxWidth: 345,
            maxHeight: 800,
            maxLength: 300
        };
        const theme = createMuiTheme({
            palette: {
                primary: cyan
            }
        });

        return (
            <div>
                <ApplicationBar value={this.inputedMovie} onChange={this.onSearchInput}/> 
                {this
                    .state
                    .results
                    .map(results => (
                        <Card style={card}> 
                            {results.backdrop_path != null ?
                            <img
                                src={`https://image.tmdb.org/t/p/w500${results.backdrop_path}`}
                                alt='Movie Backdrop'/> : <img src={emptyImage} alt='Not available'/>}
                            <CardContent>
                                <Typography gutterBottom variant="headline" component="h2">
                                    {results.title}
                                </Typography>
                                <Typography component="p">
                                    <p>
                                        {results.overview}
                                    </p>
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <MuiThemeProvider theme={theme}>
                                    <Link
                                        to={`/movie/${results.id}`}
                                        style={{
                                        textDecoration: 'none'
                                    }}>
                                        <Button size="small" color="primary" onClick={this.handleClickOpen}>
                                            Learn More
                                            <Route
                                                path={`/movie/${results.id}`}
                                                render={(props) => <MovieDialog {...props} 
                                                movieId={results.id}/>}/>
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