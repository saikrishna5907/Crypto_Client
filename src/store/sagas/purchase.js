import * as actions from '../actions/index';
import { put } from 'redux-saga/effects';
import * as jwt_decode from "jwt-decode";
import axios from 'axios';

export function* purchaseCryptoSaga(action) {
    yield put(actions.fetchCryptoDataStart());
    try {
        const decodedData = JSON.stringify(jwt_decode(action.token))
        const userId = JSON.parse(decodedData).userId;

        const requestBody = {
            query: `
            mutation{
                addTransaction(transactionInput:{userId: "${userId}", cryptoName: "${action.purchaseData.cryptoName}", units:${action.purchaseData.units}}){
                 _id
                      cryptoName
                      units
                      totalPurchaseAmount
                      boughtBy{
                          _id
                      }
                }
              }
            `
        }
        const res = yield axios({
            url: 'http://localhost:5000/graphql',
            method: "POST",
            data: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + action.token
            }
        });
        const newTransaction = res.data.data.addTransaction
        yield put(actions.purchaseCryptoSuccess(newTransaction._id, newTransaction))
    } catch (err) {
        yield put(actions.fetchCryptoDataFail(err.message));
    }
}
export function* fetchPurchasesSaga(action) {
    yield put(actions.fetchPurchasesStart());
    try {
        // const decodedData = JSON.stringify(jwt_decode(action.token))
        // const userId = JSON.parse(decodedData).userId;

        const requestBody = {
            query: `
            query{
                transactionsOfAUser(userId:"${action.userId}"){
                  _id
                  units
                  cryptoName
                  totalPurchaseAmount
                }
              }
            `
        }
        const res = yield axios({
            url: 'http://localhost:5000/graphql',
            method: "POST",
            data: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + action.token
            }
        });
        yield put(actions.fetchPurchasesSuccess(res.data.data.transactionsOfAUser))
    } catch (err) {
        yield put(actions.fetchPurchasesFail(err));
    }
}
export function* updatePurchaseSaga(action) {
    yield put(actions.updatePurchaseStart());
    try {

        const requestBody = {
            query: `
            mutation{
                updateTransaction(_id:"${action._id}",
                transactionInput: {cryptoName:"${action.purchase.cryptoName}", units: ${action.purchase.units},totalPurchaseAmount: ${action.purchase.totalPurchaseAmount}}){
                  _id
                  cryptoName
                  totalPurchaseAmount
                  units
                }
              }
            `
        }
        const res = yield axios({
            url: 'http://localhost:5000/graphql',
            method: "POST",
            data: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + action.token
            }
        });
        console.log(res)
        yield put(actions.updatePurchaseSuccess(res.data.data));
    } catch (err) {
        yield put(actions.updatePurchaseFail(err));
    }
}
export function* deletePurchaseSaga(action) {
    yield put(actions.deletePurchaseStart());
    try {
        

        const requestBody = {
            query: `
            mutation{
                deleteTransaction(_id: "${action._id}"){
                    _id
                    cryptoName
                    totalPurchaseAmount
                    units
                  }
              }
            `
        }
        const res = yield axios({
            url: 'http://localhost:5000/graphql',
            method: "POST",
            data: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + action.token
            }
        });

        console.log(res.data.data)
        yield put(actions.deletePurchaseSuccess(res.data.data.deleteTransaction));
    } catch (err) {
        yield put(actions.deletePurchaseFail(err));
    }
}