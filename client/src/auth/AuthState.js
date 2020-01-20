import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import { LOGIN_USER } from '../types';

const AuthState = props => {
    const initialState = {
        creds: {
            username: '',
            password: '',
        },
        success: false,
        isAuthenticated: false
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const loginUser = (creds) => {
        console.log('login reached');
        dispatch({
            type: LOGIN_USER,
            payload: creds
        })
    }

    return (
        <AuthContext.Provider
            value={{
                username: state.creds.username,
                password: state.creds.password,
                success: state.success,
                loginUser,
                isAuthenticated: state.isAuthenticated
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;