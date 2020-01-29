import React, { PureComponent } from 'react';
import {  Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/index';
import Layout from '../hoc/UserDashboardLayout/userDashboardLayout';
import HomePage from './HomePage/homePage';
import Authenticate from '../containers/Authentication/authenticate';
import LogoutComponent from '../containers/Authentication/signOut';
import SignUpForm from '../containers/SignUp/signUp';
import Purchases from '../containers/UserPurchases/userPurchases';
import PurchaseCrypto from '../containers/PurchaseCrypto/purchase';
class App extends PureComponent {
  componentDidMount() {
    this.props.onTryAutoSignUp();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/login" component={(props) => <Authenticate {...props} />} />
        <Route path='/signUp'  component={(props) => <SignUpForm {...props} />} />
        <Route path="/" exact component={(props) => <HomePage {...props} />} />
        <Redirect to="/" />
      </Switch>
    )
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/checkout' component={(props) => <PurchaseCrypto {...props} />} />
          <Route path='/login' component={(props) => <Authenticate {...props} />} />
          <Route path='/logout' component={(props) => <LogoutComponent {...props} />} />
          <Route path='/yourPurchases' component={(props) => <Purchases {...props} />} />
          <Route path='/signUp'  component={(props) => <SignUpForm {...props} />} />
          <Route path='/' exact component={(props) => <HomePage {...props} />} />
          <Redirect to="/" />
        </Switch>
      )
    }
    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
