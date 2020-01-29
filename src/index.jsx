import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleWare from 'redux-saga';

import authReducer from './store/reducers/auth';
import cryptoDataReducer from './store/reducers/cryptoData';
import purchasesReducer from './store/reducers/purchase';
import signUpReducer from './store/reducers/signUp';
import { watchAuth, watchCryptoData, watchPurchase, watchSignUp } from './store/sagas/index';
// const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
    auth: authReducer,
    crypto: cryptoDataReducer,
    purchase: purchasesReducer,
    signUp: signUpReducer
});
const sagaMiddleware = createSagaMiddleWare();
const store = createStore(reducers, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchCryptoData);
sagaMiddleware.run(watchPurchase);
sagaMiddleware.run(watchSignUp);
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
