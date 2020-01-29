import * as actionTypes from './actionTypes';

export const signUpUserStart = () => {
    return {
        type: actionTypes.SIGN_UP_USER_START
    };
};
export const signUpUserFail = (error) => {
    return {
        type: actionTypes.SIGN_UP_USER_FAIL,
        error: error
    };
};
export const signUpUserSuccess = (userId) => {
    return {
        type: actionTypes.SIGN_UP_USER_SUCCESS,
        userId: userId
    };
};
export const signUpUser = (data) => {
    return {
        type: actionTypes.SIGN_UP_USER_SAGA,
        data: data
    };
};