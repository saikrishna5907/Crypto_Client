import React, { Component } from 'react'
import classes from './cryptoLoginForm.module.css';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { Container } from 'react-bootstrap';
import { TextField, FormControl, Grid, InputLabel, Input, IconButton, InputAdornment, Fab } from '@material-ui/core';
import { AccountCircle, Visibility, VisibilityOff, Lock, LockOpen } from '@material-ui/icons';
const theme = createMuiTheme({
    overrides: {
        MuiInputAdornment: {
            root: {
                marginLeft: '25%',
            }
        },
        MuiInputLabel: {
            root: {
                fontSize: 20,
                margin: '0 10px'
            }
        },
        MuiInput: {
            root: {
                underline: 'white',
                color: 'white'
            }
        },
        MuiFormLabel: {
            root: {
                fontSize: 15,
            }
        },
        MuiGrid: {
            container: {
                padding: '20px',
                display: 'block'
            }
        },
        MuiInputBase: {
            root: {
                width: '40vw',
                margin: '10px 10px'
            }
        },
        MuiFab: {
            root: {
                backgroundColor: '#E56529',
                color: 'white',
                fontSize: 20,
                "&:hover": {
                    color: 'white'
                },
                "&:active": {
                    outline: 'none'
                },
                "&:focus": {
                    outline: 'none'
                }
            },
            extended: {
                width: '70%',
                margin: '7vh 6vw',
            }
        },
        MuiSvgIcon: {
            root: {
                marginRight: '20px'
            }
        }
    }
});
class CryptoLoginForm extends Component {
    state = {
        showPassword: false
    }

    handleClickShowPassword = () => {
        this.setState(() => {
            return ({ showPassword: !this.state.showPassword })
        })
    };


    render() {
        return (
            <div>
                <ThemeProvider theme={theme}>

                    <div className={classes.mainDiv}>
                        <div className={classes.margin}>
                            <Container className={classes.errors}>
                                <ul>
                                    {this.props.formErrors.map(err => {
                                        console.log(err);
                                        return <li key={err.msg}>{err.msg}</li>
                                    })}
                                </ul>
                            </Container>
                            <Grid container spacing={1} alignItems="flex-end">
                                <Grid item>
                                    <AccountCircle />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="input-with-icon-grid"
                                        label="Email ID"
                                        onChange={(event) => this.props.onEmailChange(event)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={1} alignItems="flex-end">
                                <Grid item>
                                    <Lock />
                                </Grid>
                                <Grid item>
                                    <FormControl>
                                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                        <Input
                                            id="standard-adornment-password"
                                            type={this.state.showPassword ? 'text' : 'password'}
                                            onChange={(event) => this.props.onPasswordChange(event)}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={this.handleClickShowPassword}
                                                    >
                                                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            {this.props.error ?
                                <p
                                    style={{ marginLeft: '20px', color: '#C0392B', width: '50%',backgroundColor: 'white' }}
                                >
                                    {this.props.error}
                                    <br /> Please Try Again...!</p>
                                : null}
                            <Fab variant="extended" onClick={() => this.props.authenticateHandler()}>
                                <LockOpen className={classes.extendedIcon} />
                                Sign In
                            </Fab>
                        </div>
                    </div>
                </ThemeProvider>
            </div>
        );
    }
}
export default CryptoLoginForm;