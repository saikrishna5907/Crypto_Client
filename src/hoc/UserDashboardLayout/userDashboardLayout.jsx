import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import classes from './userDashboardLayout.module.css';
import NavBar from '../../components/DashboardNavBar/navbar';
class UserDashboardLayout extends Component {
    render() {
        return (
            <Fragment>
                <NavBar 
                    isAuthenticated={this.props.isAuthenticated}
                />
               
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Fragment>
        );
    }
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}
export default connect(mapStateToProps)(UserDashboardLayout);
