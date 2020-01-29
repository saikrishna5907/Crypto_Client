import React, { Component, Fragment } from 'react';
import SignUpForm from '../../components/SignUpForm/signUpForm';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { validateSignUpForm } from '../../shared/validationFunctions';
class SignUp extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        formErrors: []
    }
    firstNameHandler = event => {
        this.setState({ firstName: event.target.value });
    }
    lastNameHandler = event => {
        this.setState({ lastName: event.target.value });
    }
    emailHandler = event => {
        this.setState({ email: event.target.value });
    }
    passwordHandler = event => {
        this.setState({ password: event.target.value });
    }
    confirmPasswordHandler = event => {
        console.log()
        this.setState({ confirmPassword: event.target.value });
    }
    clearFieldsHandler= () => {
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        })
    }
    onSignUpHandler = async () => {
        const errors = await validateSignUpForm(this.state);
        await this.setState({ formErrors: errors });
        if (this.state.formErrors.length === 0) {
            const data = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
            }
            this.clearFieldsHandler();
            await this.props.onSignUp(data);
            if (this.props.error === '' && this.props.userId !== '') {
                this.props.history.push('/login');
            }
        }
    }
    render() {
        return (
            <Fragment>
                <SignUpForm
                    formErrors={this.state.formErrors}
                    data= {this.state}
                    error={this.props.error}
                    firstNameHandler={this.firstNameHandler}
                    lastNameHandler={this.lastNameHandler}
                    emailHandler={this.emailHandler}
                    passwordHandler={this.passwordHandler}
                    confirmPassword={this.confirmPasswordHandler}
                    onSignUpHandler={this.onSignUpHandler}
                />
            </Fragment>
        );
    }
}
const mapStateToProps = state => {
    return {
        error: state.signUp.error,
        newUserId: state.signUp.userId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onSignUp: (data) => dispatch(actions.signUpUser(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);