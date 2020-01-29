import * as actions from '../actions/index';
import { delay, put } from 'redux-saga/effects';
import axios from 'axios';
import * as jwt_decode from "jwt-decode";
export function* logoutSaga(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());
}
export function* authenticateUserSaga(action) {
    yield put(actions.authUserStart());
    try {
        const requestBody = {
            query: `
                query {
                    login(email: "${action.email}", password: "${action.password}") {
                        userId,
                        token,
                        expiresIn
                    }
                }
            `
        };
        const res = yield axios({
            url: 'http://localhost:5000/graphql',
            method: "POST",
            data: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (res.data.errors) {
            if (res.data.errors.length > 0) {
                yield put(actions.authUserFailed(res.data.errors[0].message));
            }
        }
        const token = res.data.data.login.token;
        const decodedData = JSON.stringify(jwt_decode(token))
        const expirationInUnix = JSON.parse(decodedData).exp;
        const userId = JSON.parse(decodedData).userId;
        const expirationDate = yield new Date(expirationInUnix * 1000);
        yield localStorage.setItem('token', token);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('userId', userId);
        yield put(actions.authUserSuccess(token, userId));
    } catch (error) {
        yield actions.authUserFailed(error);
    }
};

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem('token')
    if (!token) {
        yield put(actions.logout());
    }
    else {
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
        if (expirationDate <= new Date()) {
            yield put(actions.logout())
        } else {
            const userId = yield localStorage.getItem('userId')
            yield put(actions.authUserSuccess(token, userId));
            yield put(actions.checkAuthTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000))
        }
    }
}
