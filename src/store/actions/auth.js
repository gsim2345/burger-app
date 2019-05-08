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
        // remove token and expirationDate from Localstorage if it is expired. 
        localStorage.removeItem('token');
        localStorage.removeItem('expirationDate');
        localStorage.removeItem('userId');
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
            
            // if we are logged in, and reload the page, the login state is lost, as we download the whole js again, and everything gets executed again. 
            // Our state stored in Redux is lost. 
            // We need to persist our login state across sessions, save the token ==> Local storage
            localStorage.setItem('token', response.data.idToken);
            // we also need to store when it expires:
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            // JS date needs to be in milliseconds, and we get it in seconds, hence => *1000
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', response.data.localId);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));

            // ABOUT REFRESH TOKENS: 
            // the id token expires after one hour
            // we also get a refresh token that doesn't expire. 
            // We can store that too in local storage, and with every http request we send the refresh token, and exchange with a new id token:
            // https://firebase.google.com/docs/reference/rest/auth?authuser=0#section-refresh-token
            // that gives the user experience that the user never logs out. 
            // Using  localStorage => Make sure to be protected about XSS attacks
            // Using Cookies => Make sure to protect against CSRF attacks
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

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            // we get back from local storage a string, and need to convert it into a Date object.
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/ 1000)) ;
            }
        }
    };
}