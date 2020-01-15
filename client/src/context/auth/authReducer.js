import {
    LOGIN_USER
} from '../types';

export default (state, action) => {
    switch(action.type) {
        case LOGIN_USER:
            return {
                ...state,
                    
            }
            default:
                console.log('hello');
    }
}