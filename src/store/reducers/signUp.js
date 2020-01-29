import * as actionTypes from '../actions/actionTypes';

const initialState ={
    loading: false,
    error: '',
    userId: ''
}
const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SIGN_UP_USER_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.SIGN_UP_USER_FAIL: 
            return {
                ...state,
                error: action.error,
                loading: false
            };
        case actionTypes.SIGN_UP_USER_SUCCESS:
            return{
                ...state,
                loading:false,
                error: '',
                userId: action.userId
            };
        default :
            return state;
    }
}
export default reducer;