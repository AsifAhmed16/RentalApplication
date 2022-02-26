import * as types from './actionType';
import axios from 'axios';


const getProducts = (products) => ({
    type: types.GET_PRODUCTS,
    payload: products,
});

const getSingleProduct = (product) => ({
    type: types.GET_SINGLE_PRODUCT,
    payload: product,
});

const productEdited = () => ({
    type: types.EDIT_PRODUCT,
});

const productAdded = () => ({
    type: types.ADD_PRODUCT,
});

const productDeleted = () => ({
    type: types.DELETE_PRODUCT,
});

const bookCosting = (estimated_cost) => ({
    type: types.BOOK_COSTING,
    payload: estimated_cost,
});

const returnCosting = (total_cost) => ({
    type: types.RETURN_COSTING,
    payload: total_cost,
});

const productBooked = () => ({
    type: types.BOOK_PRODUCT,
});

const productReturned = () => ({
    type: types.RETURN_PRODUCT,
});

export const loadProducts = () => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_API_URL}/product/`)
        .then((resp) => {
            dispatch(getProducts(resp.data));
        })
        .catch(error => console.log(error))
    }
}

export const addProduct = (product) => {
    return function (dispatch) {
        axios.post(`${process.env.REACT_APP_API_URL}/product/add/`, product)
        .then((resp) => {
            dispatch(productAdded());
        })
        .catch(error => console.log(error))
    }
}

export const editProduct = (id, product) => {
    return function (dispatch) {
        axios.put(`${process.env.REACT_APP_API_URL}/product/edit/${id}/`, product)
        .then((resp) => {
            dispatch(productEdited());
        })
        .catch(error => console.log(error))
    }
}

export const loadSingleProduct = (id) => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_API_URL}/product/details/${id}/`)
        .then((resp) => {
            dispatch(getSingleProduct(resp.data));
        })
        .catch(error => console.log(error))
    }
}

export const deleteProduct = (id) => {
    return function (dispatch) {
        axios.delete(`${process.env.REACT_APP_API_URL}/product/delete/${id}/`)
        .then((resp) => {
            dispatch(productDeleted());
            dispatch(loadProducts());
        })
        .catch(error => console.log(error))
    }
}

export const productBookCosting = (id, start_date, end_date) => {
    return function (dispatch) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({ start_date, end_date });
        axios.post(`${process.env.REACT_APP_API_URL}/product/book/cost/${id}/`, body, config)
        .then((resp) => {
            dispatch(bookCosting(resp.data.estimated_cost));
        })
        .catch(error => console.log(error))
    }
}

export const bookProduct = (id, start_date) => {
    return function (dispatch) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({ start_date });
        axios.post(`${process.env.REACT_APP_API_URL}/product/book/${id}/`, body, config)
        .then((resp) => {
            dispatch(productBooked());
        })
        .catch(error => console.log(error))
    }
}

export const productReturnCosting = (id, start_date, end_date) => {
    return function (dispatch) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({ start_date, end_date });
        axios.post(`${process.env.REACT_APP_API_URL}/product/return/cost/${id}/`, body, config)
        .then((resp) => {
            dispatch(returnCosting(resp.data.total_cost));
        })
        .catch(error => console.log(error))
    }
}

export const returnProduct = (id, start_date, end_date, used_mileage) => {
    return function (dispatch) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({ start_date, end_date, used_mileage });
        axios.post(`${process.env.REACT_APP_API_URL}/product/return/${id}/`, body, config)
        .then((resp) => {
            dispatch(productReturned());
        })
        .catch(error => console.log(error))
    }
}
