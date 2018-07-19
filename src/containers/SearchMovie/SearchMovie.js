import React, {Component} from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import cyan from "@material-ui/core/colors/cyan";

import AppBar from "../../components/AppBar/AppBar";
import './SearchMovie.css';

class SearchMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: []
        };
        this.apiUrl = 'https://api.themoviedb.org/3/search/movie?api_key=6fb03dacf22ba1a33f234622a7a2db' +
                'cf&language=en-US&query=';
        this.imageUrl = 'https://image.tmdb.org/t/p/w500/';
    }

    componentDidMount = () => {
        axios
            .get(this.movieRequest)
            .then(response => {
                this.setState({results: response.data.results});
            })
    }

    inputHandler = (event) => {
        this.inputQuery = event.target.value;
        this.movieRequest = this.apiUrl + this.inputQuery;
        this.setState({movieRequest: this.inputQuery})
        this.componentDidMount();
    }

    getPoster = (event) => {
        this.poster_path = event.target.value;
        this.movieRequest = this.imageUrl + this.poster_path;
        this.setState({imageUrl: this.poster_path})
        this.componentDidMount();
        axios
            .get(this.imageUrl)
            .then(response => {
                this.setState({results: response.data.results});
            })
    }

    render() {
        const card = {
            display: 'inline-block',
            margin: '20px',
            position: 'relative',
            maxWidth: 345,
            maxHeight: 800
        };

        const media = {
            paddingTop: '0%' // 16:9
        };

        const theme = createMuiTheme({
            palette: {
                primary: cyan
            }
        });
        return (
            <div>
                <AppBar value={this.inputQuery} onChange={this.inputHandler}/> {this
                    .state
                    .results
                    .map(results => (
                        <Card style={card}>
                            <img
                                style={media}
                                src={this.imageUrl + results.backdrop_path}
                                onChange={this.getPoster}
                                alt='Movie Poster'/>
                            <CardContent>
                                <Typography gutterBottom variant="headline" component="h2">
                                    {results.title}
                                </Typography>
                                <Typography component="p">
                                    {results.overview}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <MuiThemeProvider theme={theme}>
                                    <Button size="small" color="primary">
                                        Learn More
                                    </Button>
                                </MuiThemeProvider>
                            </CardActions>
                        </Card>
                    ))}
            </div>
        );
    }
}

export default SearchMovie;