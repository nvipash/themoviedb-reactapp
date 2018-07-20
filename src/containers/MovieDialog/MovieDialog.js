import React, {Component} from 'react';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
    return <Slide direction="up" {...props}/>;
}

export default class MovieDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            original_title: '',
            // overview: '',
            open: true
        };
    }

    getMovieDerails = (movieId) => {
        axios
            .get(`https://api.themoviedb.org/3/movie${movieId}?api_key=6fb03dacf22ba1a33f234622a7a2dbcf&language=en-US`)
            .then(response => {
                this.setState({original_title: response.data.original_title, overview: response.data.overview});
            })
    }

    handleCloseDialog = () => {
        this.setState({open: false});
    };

    componentDidMount = () => {
        this.getMovieDerails(this.props.location.pathname);
    }

    render() {
        const arrowBack = {
            position: 'left'
        }
        
        return (
            <div>
                {this
                    .state
                    .original_title.map(original_title => (
                        <Dialog
                            open={this.state.open}
                            keepMounted
                            onClose={this.handleCloseDialog}
                            aria-labelledby="alert-dialog-slide-title"
                            TransitionComponent={Transition}
                            aria-describedby="alert-dialog-slide-description">
                            <DialogActions>
                                <IconButton
                                    onClick={this.handleCloseDialog}
                                    style={arrowBack}
                                    color="black"
                                    aria-label="Back">
                                    <ArrowBack/>
                                </IconButton>
                            </DialogActions>
                            <DialogTitle id="alert-dialog-slide-title">
                                {original_title.original_title}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description">
                                    {/* {overview} */}
                                </DialogContentText>
                            </DialogContent>
                        </Dialog>
                    ))}
            </div>
        )
    }
}