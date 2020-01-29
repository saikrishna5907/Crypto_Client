import {takeEvery} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import {  checkAuthTimeoutSaga, authenticateUserSaga, authCheckStateSaga, logoutSaga } from './auth';
import { fetchCryptoDataSaga } from './cryptoData';
import {purchaseCryptoSaga, fetchPurchasesSaga, deletePurchaseSaga, updatePurchaseSaga} from './purchase';
import {signUpUserSaga} from './signUp';
export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_LOGOUT_START, logoutSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
    yield takeEvery(actionTypes.AUTH_USER_SAGA, authenticateUserSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_STATE,authCheckStateSaga )
}
export function* watchCryptoData(){
    yield takeEvery(actionTypes.FETCH_CRYPTO_DATA_SAGA, fetchCryptoDataSaga);
}
export function* watchPurchase(){
    yield takeEvery(actionTypes.PURCHASE_CRYPTO_SAGA,purchaseCryptoSaga);
    yield takeEvery(actionTypes.FETCH_TRANSACTIONS_SAGA, fetchPurchasesSaga);
    yield takeEvery(actionTypes.DELETE_TRANSACTION_SAGA, deletePurchaseSaga);
    yield takeEvery (actionTypes.UPDATE_TRANSACTION_SAGA, updatePurchaseSaga);
}
export function* watchSignUp(){
    yield takeEvery(actionTypes.SIGN_UP_USER_SAGA, signUpUserSaga);
}