import * as actionTypes from '../actions/actionTypes';

const initialState = {
    purchases: [],
    loading: false,
    purchased: false,
    updatedPurchase: [],
    deletedPurchase: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_CRYPTO_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.PURCHASE_CRYPTO_FAIL:
            return {
                ...state,
                loading: false
            }
        case actionTypes.PURCHASE_CRYPTO_SUCCESS:
            const newPurchase = {
                ...action.purchaseData,
                id: action.purchaseId
            }
            return {
                ...state,
                loading: false,
                purchased: true,
                purchases: state.purchases.concat(newPurchase)
            }
        case actionTypes.FETCH_TRANSACTIONS_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_TRANSACTIONS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.FETCH_TRANSACTIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                purchases: action.purchases
            }
        case actionTypes.UPDATE_TRANSACTION_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.UPDATE_TRANSACTION_FAIL:
            return {
                ...state,
                loading: false
            }
        case actionTypes.UPDATE_TRANSACTION_SUCCESS:
            return {
                ...state,
                updatedPurchase: state.updatedPurchase.concat(action.purchase)
            }
        case actionTypes.DELETE_TRANSACTION_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.DELETE_TRANSACTION_FAIL:
            return {
                ...state,
                loading: false
            }
        case actionTypes.DELETE_TRANSACTION_SUCCESS:
            let updatedPurchases = [];
            updatedPurchases = state.purchases.filter(pur => pur._id !== action.purchase._id)
            return {
                ...state,
                loading: false,
                purchases: updatedPurchases,
                deletedPurchase: state.deletedPurchase.concat(action.purchase)
            }
        default:
            return state;
    }
};
export default reducer;