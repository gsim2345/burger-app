// not using our axios-order instance, that has a different base URL
import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
        return {
            type: actionTypes.AUTH_LOGOUT
        }
}

export const checkAuthTimeout = (expirationTime) => {
    // we need dispatch, as we run async code
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
            // expirationTime is coming in milliseconds, we need to turn it into seconds
        }, expirationTime * 1000);
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        // authenticate the user
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBoxIoD-SgooBc6S9RpO4Xoy3vSviXKniM';
        if (!isSignup) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBoxIoD-SgooBc6S9RpO4Xoy3vSviXKniM'
        }
        axios.post(url, authData)
        .then(response => {
            console.log(response);
            // localId: userId
            // idToken: the token 
            // refreshToken needs if we don't want the login to expire in an hour. 
            // we use the token to make requests to protected resources
            // change in Firebase; Database/Rules, so the whole database can only be accessed by authenticated user: 
            //"rules": {
            //".read": 'auth != null',
            //".write": 'auth != null'
            //}
            /*
            A more specific rule, only needs to be authenticated to see the orders
            {
            "rules": {
    	        "ingredients": {
                    ".read": "true",
    		        ".write": "true"
                },
    	        "orders": {
      	            ".read": "auth != null",
                    ".write": "auth != null"
                }
            }
            } */
            
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(error => {
            console.log(error.response);
            // this is how error object can be accessed with Firebase: error.response.data.error
            dispatch(authFail(error.response.data.error));
        });
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}