import React, { Component, Fragment } from 'react';
import { Button, Container } from 'react-bootstrap';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import classes from './homePage.module.css';
class HomePage extends Component {
    render() {
        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to="/yourPurchases" />
        }
        const mainPageContent = (
            <Container className={classes.mainContainer}>
                <h2>Want to buy some Cypto today ?</h2>
                <p> Please Login Here</p>
                <NavLink to="/login">
                    <Button className={classes.loginBtn} size="lg">
                        Sign In
                </Button>
                </NavLink>
                <Container className={classes.signUpContainer}>
                    <div style={{ color: 'white' }}>
                        <p >Does not have an Account?</p>
                        <p> Lets get started here</p>
                    </div>
                    <NavLink to="/signUp">
                        <Button className={classes.signUpBtn} size="lg">
                            Sign Up
                    </Button>
                    </NavLink>
                </Container>
            </Container>
        )
        return (
            <Fragment>
                {authRedirect}
                {mainPageContent}
            </Fragment>
           
        );
    }
}

const mapstateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapstateToProps)(HomePage);