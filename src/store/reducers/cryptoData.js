import * as actionTypes from '../actions/actionTypes';

const initialState = {
    cryptoData: [],
    loading: false,
    error: null,
}

const reducer = (state= initialState, action) =>{
    switch(action.type){
        case actionTypes.FETCH_CRYPTO_DATA_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_CRYPTO_DATA_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.FETCH_CRYPTO_DATA_SUCCESS:
            return {
                ...state,
                loading:false,
                cryptoData: action.cryptoData
            }
        default :
            return state;
    }
};

export default reducer;