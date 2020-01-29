import React from 'react';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import classes from './checkoutForm.module.css';

import { TextField } from '@material-ui/core';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const checkOutForm = props => {
    return (
        <Container className={classes.mainContainer}>
            <Container className={classes.errors}>
                <ul>
                    {props.formErrors.map(err => {
                        console.log(err);
                        return <li key={err.msg}>{err.msg}</li>
                    })}
                </ul>
            </Container>
            <FormControl style={{ padding: '25px', width: '100%' }} className={classes.formControl}>
                <InputLabel id="demo-simple-select-helper-label">Crypto Currency Name</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={props.cryptoName}
                    onChange={(event) => props.handleCurrencyChange(event)}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {props.cryptoData.map(crypto => {
                        return <MenuItem key={crypto.name} value={crypto.name}>{crypto.name}</MenuItem>
                    })}
                </Select>
                <FormHelperText
                    style={{ marginBottom: '5vh' }}
                >Please select a Currency</FormHelperText>

                <TextField
                    id="standard-number"
                    label="Currency units"
                    type="number"
                    value={props.units}
                    onChange={(event) => props.handleUnitsChange(event)}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                />
                <div>Total Price (in AUD): <h4>{props.totalCostInAUD.toFixed(3)}</h4></div>
                {!props.editInProgress ?
                    <Button
                        className={classes.buyBtn}
                        onClick={() => props.onPurchaseHandler()}
                    >
                        Buy Now
                    </Button> :
                    <Button
                        className={classes.editBtn}
                        onClick={() => props.onEditPurchaseHandler()}
                    >
                        Save Changes
                    </Button>}
                <Button
                    className={classes.cancelBtn}
                >
                    <Link to="/yourPurchases">Cancel</Link>
                </Button>

            </FormControl>


        </Container>

    );
}


export default checkOutForm;