import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (token, userId) => {
    console.log('asdasdasd');
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.LOGOUT,
    }
};

export const checkoutTimer = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000);
    }
};

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        let urlPrt1 = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
        let api_key = 'AIzaSyC0V_RrqMFdcivvTQiRPCJDYdLPfLVBK8c';

        if (isSignUp) {
            urlPrt1 = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
        };

        let url = urlPrt1 + api_key;

        axios.post(url, authData)
            .then(response => {
                console.log(response.data);
                console.log('asdasd');
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                //localId and idToken - those are mentioned in  console.log
                dispatch(checkoutTimer(response.data.expiresIn));
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err.response.data.error))  //writes the error name such as: EMAIL EXISTS, EMAIL was not found and so on.
            });
    }
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkoutTimer((expirationDate.getTime() - new Date().getTime() / 1000 )))
            }
        }
    }
};