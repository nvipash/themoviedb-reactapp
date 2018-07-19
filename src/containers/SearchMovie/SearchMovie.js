import React, {Component} from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
        this.styles = {
            card: {
                display: 'inline-block',
                maxWidth: 345
            },
            media: {
                height: 0,
                paddingTop: '56.25%', // 16:9
            }
        };
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

    // getPoster = () => {
    //     this.poster_path = this.state.results.map(results => results.poster_path);
    //     this.imageRequest = this.imageUrl + this.poster_path;
    //     this.setState({imageRequest: this.poster_path})
    // }

    render() {
        return (
            <div>
                <AppBar value={this.inputQuery} onChange={this.inputHandler}/> 
                {this
                    .state
                    .results
                    .map(results => (
                        <p>
                        <Card style={this.state.styles}>
                            <CardMedia style={this.state.styles} image={this.imageRequest}/>
                            <CardContent>
                                <Typography gutterBottom variant="headline" component="h2">
                                    {results.title}
                                </Typography>
                                <Typography component="p">
                                    {results.overview}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Learn More
                                </Button>
                            </CardActions>
                        </Card>
                        <span />
                        </p>
                    ))}
            </div>
        );
    }
}

export default SearchMovie;