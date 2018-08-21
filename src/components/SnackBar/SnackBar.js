import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

export default function SnackBar(props) {
    if (!props.open) {
      return null;
    }
    return (<Snackbar
        anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
        onClose={props.onClose}
        open={props.open}
        autoHideDuration={3000}
        ContentProps={{'aria-describedby': 'message-id'}}
        message={<span id = "message-id"> {props.message} </span>}/>)
}