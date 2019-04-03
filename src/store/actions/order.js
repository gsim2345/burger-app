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

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
}

// asyncronous action creators

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
            .then(response => {
                // stop spinner
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
                // we redirected to the root earlier, but we don't use routing now
                //this.props.history.push('/');
                // instead we dispatch a new action for that. - PURCHASE_INIT
                // it will be dispatched whenever we load the checkout page. 
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error));
            })
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}