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

// we want to userId being part of orderData, so we can send it to the backend => in contactData
export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData)
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

// Orders

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS, 
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = (token, userId) => {
    // another way of getting the token from state here:
    // return (dispatch, getState)
    return dispatch => {
        dispatch(fetchOrdersStart());
        //https://firebase.google.com/docs/database/rest/retrieve-data?authuser=0#section-rest-filtering
        // if we want to use filtering , need to adjust rules in Firebase: Add .indexOn to Orders:
        /*
        {
        "rules": {
    	    "ingredients": {
            ".read": "true",
    		".write": "true"
            },
    	    "orders": {
      	        ".read": "auth != null",
                ".write": "auth != null",
                ".indexOn" : ["userId"]
            }
        }
        } */
        // In a real application add more security: https://firebase.google.com/docs/database/security/
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        
        axios.get('orders.json' + queryParams)
        /* alternative syntax:
        axios.get('/orders.json', {
            params: {
                auth: token,
                orderBy: '"userId"',
                equalTo: `"${userId}"`,
            }
          }) */
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    // we are pushing an object, with the copy of data, and add key manually
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(error => {
                dispatch(fetchOrdersFail(error));
            });
    }
    
}