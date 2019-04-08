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
            dispatch(authSuccess(response.data.idToken, response.data.localId));
        })
        .catch(error => {
            console.log(error.response);
            // this is how error object can be accessed with Firebase: error.response.data.error
            dispatch(authFail(error.response.data.error));
        });
    }
}