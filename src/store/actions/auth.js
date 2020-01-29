import * as actionTypes from './actionTypes';

export const authUserStart = () => {
    return {
        type: actionTypes.AUTH_USER_START
    };
};

export const authUserFailed = (error) => {
    return {
        type: actionTypes.AUTH_USER_FAILED,
        error: error
    };
};
export const authUserSuccess = (token, userId) =>{
    return {
        type: actionTypes.AUTH_USER_SUCCESS,
        token: token,
        userId: userId
    };
};
export const authUser = (email, password) => {
    return {
        type: actionTypes.AUTH_USER_SAGA,
        email: email,
        password: password
    };
};
export const checkAuthTimeOut = (expirationTime) => {
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime: expirationTime
    };
};
export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT_START
    };
};
export const logoutSucceed = () => {
    return{
        type: actionTypes.AUTH_LOGOUT_SAGA
    }
};
export const authCheckState = () => {
    return {
        type:actionTypes.AUTH_CHECK_STATE
    }
};
export const setAuthRedirectPath=(path) => {
    return{
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}