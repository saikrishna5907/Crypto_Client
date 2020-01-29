import React, { Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import classes from './navbar.module.css';
import { Link } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
const theme = createMuiTheme({
    overrides: {
        MuiAppBar: {
            colorPrimary: {
                color: 'black',
                fontSize: 52,
                backgroundColor: '#43BB71'
            }
        },
        MuiButton: {
            label: {
                fontSize: 20
            },
            root: {
                marginLeft: '2vw',
                marginRight: '3vw'
            }
        }
    }
})
const navbar = props => {
    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Crypto
                    </Typography>
                        {props.isAuthenticated ? (
                            <Fragment>
                                <Button color="inherit">
                                    <Link to="/yourPurchases" >YOUR PURCHASES</Link>
                                </Button>
                                <Button color="inherit">
                                    <Link to="/checkout" >PURCHASE NOW</Link>
                                </Button>
                                <Button color="inherit">
                                    <Link to="/logout" >SIGN OUT</Link>
                                </Button>
                            </Fragment>
                        ) : (
                                <Fragment>
                                    <Button color="inherit">
                                        <Link to="/login" >SIGN IN</Link>
                                    </Button>
                                    <Button color="inherit">
                                        <Link to="/signUp" >SIGN UP</Link>
                                    </Button>
                                </Fragment>
                            )}

                    </Toolbar>
                </AppBar>
            </div>
        </ThemeProvider>
    );

}

export default navbar;