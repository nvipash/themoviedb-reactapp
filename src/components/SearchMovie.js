import React, {Component} from 'react';
import axios from 'axios';

import './SearchMovie.css';

class SearchMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: []
        };
        this.apiUrl = 'https://api.themoviedb.org/3/search/movie?api_key=6fb03dacf22ba1a33f234622a7a2db' +
                'cf&language=en-US&query=';
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

    render() {
        return (
            <div>
                <input
                    className="movie-input"
                    value={this.inputQuery}
                    onChange={this.inputHandler}
                    placeholder = "Search movie to watch" / >
                <ul>
                    {this
                        .state
                        .results
                        .map(results => (
                            <p>
                                <ul className='title'>
                                    {results.title}
                                </ul>
                                <ul className = 'overview' >
                                    {results.overview}
                                </ul>
                            </p>
                        ))
                    }
                </ul>
            </div>
        );
    }
}

export default SearchMovie;