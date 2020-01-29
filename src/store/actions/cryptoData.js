import * as actionTypes from './actionTypes';

export const fetchCryptoDataStart = () => {
    return {
        type: actionTypes.FETCH_CRYPTO_DATA_START
    };
};

export const fetchCryptoDataFail = error => {
    return{
        type: actionTypes.FETCH_CRYPTO_DATA_FAIL,
        error: error
    };
};
export const fetchCryptoDataSuccess = (cryptoData) => {
    return {
        type: actionTypes.FETCH_CRYPTO_DATA_SUCCESS,
        cryptoData:cryptoData
    };
};
export const fetchCryptoData = token => {
    return{
        type: actionTypes.FETCH_CRYPTO_DATA_SAGA,
        token: token
    };
};