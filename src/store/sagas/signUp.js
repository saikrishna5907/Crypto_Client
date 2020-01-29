import { put } from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from 'axios';

export function* signUpUserSaga(action) {
    yield put(actions.signUpUserStart());
    try {
        const requestBody = {
            query: `
            mutation{
                addUser(userInput:{firstName: "${action.data.firstName}", 
                lastName: "${action.data.lastName}", 
                email: "${action.data.email}", 
                password: "${action.data.password}" 
            })
                {
                  _id
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
            }
        });
        if (res.data.errors) {
            if (res.data.errors.length > 0) {
                yield put(actions.signUpUserFail(res.data.errors[0].message));
            }
        } else
            yield put(actions.signUpUserSuccess(res.data.data.addUser._id));
    } catch (err) {
        yield put(actions.signUpUserFail(err));
    }
}