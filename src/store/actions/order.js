import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

// syncronous action creators

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

// asyncronous action creators

export const purchaseBurgerStart = (orderData) => {
    return dispatch => {
        axios.post('/orders.json', orderData)
            .then(response => {
                // stop spinner
                dispatch(purchaseBurgerSuccess(response.data, orderData));
                // we redirected to the root earlier, but we don't use routing now
                //this.props.history.push('/');
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error));
            })
    }
}