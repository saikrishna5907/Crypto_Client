import * as actions from '../actions/index';
import { put } from 'redux-saga/effects';
import axios from 'axios';
export function* fetchCryptoDataSaga(action) {
    yield put(actions.fetchCryptoDataStart());

    try {
        const requestBody = {
            query: `
             query{
                getCryptoNames	{      
                  name
                  currentValueinAUD,
                  symbol
                }
              }
            `
        };

        const res = yield axios({
            url: 'http://localhost:5000/graphql',
            method: "POST",
            data: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + action.token
            }
        });
        yield put(actions.fetchCryptoDataSuccess(res.data.data.getCryptoNames))
    } catch (err) {
        yield put(actions.fetchCryptoDataFail(err))
    }
}