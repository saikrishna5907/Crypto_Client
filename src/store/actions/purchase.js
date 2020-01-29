import * as actionTypes from './actionTypes';

export const purchaseCryptoStart = () =>{
    return {
        type: actionTypes.PURCHASE_CRYPTO_START
    };
};
export const purchaseCryptoFail = error => {
    return {
        type: actionTypes.PURCHASE_CRYPTO_FAIL,
        error: error
    };
};
export const purchaseCryptoSuccess = (id, purchaseData)=>{
    return {
        type: actionTypes.PURCHASE_CRYPTO_SUCCESS,
        purchaseId: id,
        purchaseData: purchaseData
    };
};
export const purchaseCrypto = (purchaseData, token) => {
    return {
        type: actionTypes.PURCHASE_CRYPTO_SAGA,
        purchaseData:purchaseData,
        token: token
    };
};
export const fetchPurchasesStart = () => {
    return {
        type: actionTypes.FETCH_TRANSACTIONS_START
    };
};
export const fetchPurchasesFail = (error) => {
    return {
        type: actionTypes.FETCH_TRANSACTIONS_FAIL,
        error: error
    };
};
export const fetchPurchasesSuccess = (purchases) => {
    return {
        type: actionTypes.FETCH_TRANSACTIONS_SUCCESS,
        purchases: purchases
    };
};
export const fetchPurchases = (token, userId) => {
    return {
        type: actionTypes.FETCH_TRANSACTIONS_SAGA,
        token: token,
        userId: userId
    };
};

export const updatePurchaseStart = () => {
    return {
        type: actionTypes.UPDATE_TRANSACTION_START
    };
};
export const updatePurchaseFail = error =>{
    return {
        type:actionTypes.UPDATE_TRANSACTION_FAIL,
        error:error
    };
};
export const updatePurchaseSuccess = (purchase) => {
    return {
        type: actionTypes.UPDATE_TRANSACTION_SUCCESS,
        updatedPurchase: purchase
    };
};
export const updatePurchase = (token,_id, purchase) => {
    return {
        type: actionTypes.UPDATE_TRANSACTION_SAGA,
        token: token,
        _id: _id,
        purchase: purchase
    };
};

export const deletePurchaseStart = () => {
    return {
        type: actionTypes.DELETE_TRANSACTION_START
    };
};
export const deletePurchaseFail = error =>{
    return {
        type:actionTypes.DELETE_TRANSACTION_FAIL,
        error:error
    };
};
export const deletePurchaseSuccess = (purchase) => {
    return {
        type: actionTypes.DELETE_TRANSACTION_SUCCESS,
        purchase: purchase
    };
};
export const deletePurchase = (token,_id) => {
    return {
        type: actionTypes.DELETE_TRANSACTION_SAGA,
        token: token,
        _id: _id
    };
};