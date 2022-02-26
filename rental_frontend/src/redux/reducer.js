import * as types from './actionType';


const initialState = {
    products: [],
    product: {},
    book_cost: 0.0,
    return_cost: 0.0,
    loading: true,
}

const productsReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                loading: false,
            }
        case types.ADD_PRODUCT:
        case types.EDIT_PRODUCT:
        case types.DELETE_PRODUCT:
        case types.BOOK_PRODUCT:
        case types.RETURN_PRODUCT:
            return {
                ...state,
                loading: false,
            }
        case types.GET_SINGLE_PRODUCT:
            return {
                ...state,
                product: action.payload,
                loading: false,
            }
        case types.BOOK_COSTING:
            return {
                ...state,
                estimated_cost: action.payload,
                loading: false,
            }
        case types.RETURN_COSTING:
            return {
                ...state,
                total_cost: action.payload,
                loading: false,
            }
        default: 
            return state;
    }
}

export default productsReducers;
