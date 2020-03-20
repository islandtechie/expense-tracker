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
        },
        expenses: []

    }

    const [state, dispatch] = useReducer(GlobalReducer, initialState);

    const setIsAuthenticated = (authState) => {
        console.log('isAuthenticated');
            dispatch({
                type: 'SET_IS_AUTHENTICATED',
                payload: authState
            })
    }

    const authenticate = ( creds ) => {

        console.log(creds.email);

        axios.post('/api/login', {
            email : creds.email,
            password : creds.password
        })
        .then(function (response) {
          console.log('Response: ', response);
          if ( ! state.error.isError) { setErrorMessage({'status': false, 'message': ''})}
          setIsAuthenticated(true);
          setLoggedInuser({
            'id': response.data.user.id,  
            'firstName' : response.data.user.fname,
            'password' : response.data.user.lname,
            'email' : response.data.user.email,
            'registered_date': response.data.user.registered_date,
            'sessionID' : response.data.session_id
          })
          console.log('Expenses: ', response.data.expenses);
          setUserExpenses(response.data.expenses);
          window.localStorage.setItem('session_id', response.data.session_id);
        })
        .catch(function (error) {
            console.log("Error: ", error);
            console.log("DATA ",error.response.data);
            console.log("STATUS", error.response.status);
            console.log("HEADERS", error.response.headers);

            setErrorMessage({'status': true, 'message': error.response.data.error});

        });
    }

    const setLoggedInuser = (user) => {
            dispatch({
                type: 'LOGIN',
                payload: user
            });
    }

    const setUserExpenses = (expenses) => {
        dispatch({
            type: 'SET_USER_EXPENSES',
            payload: expenses
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

    const logout = () => {
        console.log('logging out...');

        axios.post('/api/logout', {
            uid : state.user.id
        })
        .then(function (response) {
          console.log('Response: ', response);
          setIsAuthenticated(false);
          setLoggedInuser({});
          window.localStorage.clear();
        })
        .catch(function (error) {
            console.log(error);

        });
        
    }

    const addExpense = ( expense ) => {
        console.log("State: ", expense);

        axios.post('/api/expense', expense)
        .then((response) => {
          console.log('Response: ', response.data);
          dispatch({
            type: 'ADD_EXPENSE',
            payload: [...state.expenses, {
              'id': response.data.id,  
              'date' : response.data.date,
              'payee' : response.data.payee,
              'description' : response.data.description,
              'amount' : response.data.amount
            }]
        })
        })
        .catch((error) => {
            console.log("Error: ", error);
            console.log("DATA ",error.response.data);
            console.log("STATUS", error.response.status);
            console.log("HEADERS", error.response.headers);

            setErrorMessage({'status': true, 'message': error.response.data.error});
        });
    }


    return (
        <GlobalContext.Provider
            value={{
                isAuthenticated: state.isAuthenticated,
                authenticate,
                error: state.error,
                logout,
                addExpense,
                expenses: state.expenses
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    )
}

export default GloablState;