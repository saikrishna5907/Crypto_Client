import React, { Component } from 'react'
import classes from './signUpForm.module.css';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { Container } from 'react-bootstrap';
import { TextField, FormControl, Grid, InputLabel, Input, Fab } from '@material-ui/core';
import { PersonAdd } from '@material-ui/icons';

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
                backgroundColor: '#651192',
                color: 'white',
                fontSize: 25,
                "&:hover": {
                    backgroundColor: '#A969CB',
                    color: 'black'
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
                marginRight: '25px'
            }
        }
    }
});
class SignUpForm extends Component {

    render() {
        return (
            <div>
                <ThemeProvider theme={theme}>

                    <div className={classes.mainDiv}>
                        <div className={classes.margin}>
                            <Container className={classes.errors}>
                                <ul>
                                    {this.props.formErrors.map(err => {
                                        return <li key={err}>{err}</li>
                                    })}
                                </ul>
                            </Container>
                            <Grid container spacing={1} alignItems="flex-end">
                                <Grid item>
                                    <TextField
                                        id="input-with-icon-grid"
                                        label="First Name"
                                        value={this.props.data.firstName}
                                        onChange={(event) => this.props.firstNameHandler(event)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={1} alignItems="flex-end">
                                <Grid item>
                                    <TextField
                                        id="input-with-icon-grid"
                                        label="Last Name"
                                        value={this.props.data.lastName}
                                        onChange={(event) => this.props.lastNameHandler(event)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={1} alignItems="flex-end">
                                <Grid item>
                                    <TextField
                                        id="input-with-icon-grid"
                                        label="Email ID"
                                        value={this.props.data.email}
                                        onChange={(event) => this.props.emailHandler(event)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={1} alignItems="flex-end">
                                <Grid item>
                                    <FormControl>
                                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                        <Input
                                            id="standard-adornment-password"
                                            type="password"
                                            value={this.props.data.password}
                                            onChange={(event) => this.props.passwordHandler(event)}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1} alignItems="flex-end">
                                <Grid item>
                                    <FormControl>
                                        <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
                                        <Input
                                            id="standard-adornment-password"
                                            type="password"
                                            value={this.props.data.confirmPassword}
                                            onChange={(event) => this.props.confirmPassword(event)}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            {this.props.error ?
                                <p style={{ marginLeft: '20px', color: '#C0392B',width: '50%', backgroundColor: 'white' }}>
                                    {this.props.error}
                                    <br/> Please Try Again...!
                                </p>
                                : null
                            }
                            <Fab variant="extended" onClick={() => this.props.onSignUpHandler()}>
                                <PersonAdd className={classes.extendedIcon} />
                                Register
                            </Fab>
                        </div>
                    </div>
                </ThemeProvider>
            </div>
        );
    }
}
export default SignUpForm;