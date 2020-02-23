import React, { useReducer } from 'react';
import GlobalContext from './globalContext';
import GlobalReducer from './globalReducer';
import axios from 'axios';

const GloablState = props => {
    const initialState = {
        isAuthenticated: false,
        sessionID: null,
        user: {},
        error: {
            isError: false,
            message: ''
        }
    }

    const [state, dispatch] = useReducer(GlobalReducer, initialState);

    const setIsAuthenticated = (authState) => {
        console.log('isAuthenticated');
        setTimeout(() => {
            dispatch({
                type: 'SET_IS_AUTHENTICATED',
                payload: authState
            })
        }, 3000)
        
    }

    const authenticate = ( creds ) => {

        axios.post('/api/login', {
            email : creds.email,
            password : creds.password
        })
        .then(function (response) {
          console.log('Response: ', response);
          setIsAuthenticated(true);
          setLoggedInuser({
            'id': response.data.user.id,  
            'firstName' : response.data.user.fname,
            'password' : response.data.user.lname,
            'email' : response.data.user.email,
            'registered_date': response.data.user.registered_date,
            'sessionID' : response.data.session_id
          })
          window.localStorage.setItem('session_id', response.data.session_id);
        })
        .catch(function (error) {
            console.log("Error: ", error);
            console.log("DATA ",error.response.data);
            console.log("STATUS", error.response.status);
            console.log("HEADERS", error.response.headers);

            setErrorMessage({'isError': true, 'message': error.response.data.error});

        });
    }

    const setLoggedInuser = (user) => {
            dispatch({
                type: 'LOGIN',
                payload: {
                    'firstName' : user.firstName,
                    'password' : user.lastName,
                    'email' : user.email,
                    'sessionID' : user.sessionID
                }
            });
    }

    const setErrorMessage = (error) => {
        dispatch({
            type: 'SET_ERROR_MESSAGE',
            payload: {
                'isError' : error.status,
                'message' : error.message,
            }
        });
}


    return (
        <GlobalContext.Provider
            value={{
                isAuthenticated: state.isAuthenticated,
                authenticate,
                error: state.error
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    )
}

export default GloablState;