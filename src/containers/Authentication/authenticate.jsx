import React, { Component, Fragment } from 'react'
import CryptoLoginForm from '../../components/CryptoForm/cryptoLoginForm';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Spinner from '../../components/Spinner/spinner';
class Authenticate extends Component {
    state = {
        email: '',
        password: '',
        formErrors: []
    }
    onEmailChange = async event => {
        const value = event.target.value;
        await this.setState(() => ({ email: value }));
    }
    onPasswordChange = async event => {
        const value = event.target.value;
        await this.setState(() => ({ password: value }));
    };
    onLoginBtnHandler = async () => {
        let errors = [];
        if (!this.state.email || this.state.email === '') {
            errors.push({ field: 'email', msg: 'The Email Id required' });
        }
        if (!this.state.password || this.state.password === '') {
            errors.push({ field: 'email', msg: 'The Password is Required' });
        }
        await this.setState({ formErrors: errors });
        if (this.state.formErrors.length === 0) {
            this.props.onAuthenticate(this.state.email, this.state.password);
            if (this.props.error === '') {
                this.props.history.push('/login');
            }
        }
    };
    componentDidMount() {
        if (this.props.authRedirectPath !== '/') {
            this.props.onSetRedirectPath();
            
        }
    }
    render() {
        let form = <CryptoLoginForm
            formErrors = {this.state.formErrors}
            onEmailChange={this.onEmailChange}
            error= {this.props.error}
            onPasswordChange={this.onPasswordChange}
            authenticateHandler={this.onLoginBtnHandler}
        />
        if (this.props.loading) {
            form = <Spinner />
        }
        let errorMsg = null;
        if (this.props.error) {
            errorMsg = <p>{this.props.error.message}</p>
        }
        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to="/yourPurchases" />
        }
        return (
            <Fragment>
                {authRedirect}
                {errorMsg}
                {form}
            </Fragment>
        );
    }
}
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuthenticate: (email, password) => dispatch(actions.authUser(email, password)),
        onSetRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Authenticate);