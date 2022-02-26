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
