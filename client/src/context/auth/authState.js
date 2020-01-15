import React from 'react';
import AuthContext from './authContext';

const AuthState = props => {

    const initialState = {
        creds: {
            username: '',
            password: '',
        },
        success: false,
        isAuthenticated: false
    }

    return (
        <AuthContext.Provider
            value={{
                username: state.creds.username,
                password: state.creds.password,
                success: state.success,
                isAuthenticated: state.isAuthenticated
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;