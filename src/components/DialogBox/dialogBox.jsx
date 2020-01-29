import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const alertDialog = props => {


    return (
        <div>
            {/* <Button variant="outlined" color="primary" >
                Open alert dialog
            </Button> */}
            <Dialog
                open={props.dialogOpen}
                onClose={() => props.dialogCloseHandler()}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this transaction?"}</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous location data to
                        Google, even when no apps are running.
                         </DialogContentText> */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => props.dialogCloseHandler()} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => props.dialogAgreeHanlder()} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default alertDialog;