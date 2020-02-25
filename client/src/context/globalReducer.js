export default (state, action) => {
    switch(action.type) {
        case 'SET_IS_AUTHENTICATED':
            return {
                ...state,
                isAuthenticated: action.payload    
            }
        case 'LOGIN':
            console.log('reach mutation');
            return {
                ...state,
                user: action.payload
            }
        case 'SET_ERROR_MESSAGE':
            console.log('reached error');
            return {
                ...state,
                error: action.payload
            }
        default:
           console.log('hello');
    }
}

