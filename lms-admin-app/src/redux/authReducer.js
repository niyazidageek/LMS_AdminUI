import { actionTypes } from "./actionTypes"

const initialState = {
    profileName: null,
    isLoggedIn: false,
    isFetching: false,
    jwt: null,
    jwtExpiryDate:null,
    error:null,
    message:null,
    isMailConfirmed:false,
    rememberMe:false,
    name:null,
    surname:null,
    email:null,
    roles:[]
}

const authReducer = ( state = initialState, action) =>{ 
    switch (action.type) {
        case actionTypes.SET_USER:
            console.log(action);
            return {
                ...state,
                profileName: action.payload.profileName,
                email: action.payload.email,
                name: action.payload.name,
                surname: action.payload.surname,
                isLoggedIn: true,
                isFetching: false,
                jwt: action.payload.jwt,
                error: null,
                roles: action.payload.roles,
                message:null,
                jwtExpiryDate:action.payload.jwtExpiryDate,
                rememberMe:action.payload.rememberMe
            }
        case actionTypes.LOG_OUT:
            return initialState
        case actionTypes.SIGN_IN:
            return {
                ...state,
                isFetching: true,
                error: null
            }
        case actionTypes.SEND_CONFIRM_EMAIL:
            return{
                ...state,
                isFetching: true,
            }
        case actionTypes.CONFIRM_EMAIL:
        return{
            ...state,
            isFetching: true,
        }
        case actionTypes.SEND_CONFIRM_EMAIL_COMPLETE:
            return{
                ...state,
                isFetching:false
            }
        case actionTypes.CONFIRM_EMAIL_COMPLETE:
            return{
                ...state,
                isFetching:false,
                isMailConfirmed:true
            }
        case actionTypes.SIGN_UP:
            return {
                ...state,
                error:null,
                isFetching: true    
            }
        case actionTypes.SIGN_UP_COMPLETE:
            return {
                ...state,
                isFetching: false,
                error: null
            }
        case actionTypes.RESET_PASSWORD:
            return{
                ...state,
                isFetching:true
            }
        case actionTypes.RESET_PASSWORD_COMPLETE:
            return{
                ...state,
                isFetching:false
            }
        case actionTypes.REQUEST_RESET_PASSWORD:
            return{
                ...state,
                isFetching:true
            }
        case actionTypes.REQUEST_RESET_PASSWORD_COMPLETE:
            return{
                ...state,
                isFetching:false
            }
        case actionTypes.SIGN_IN_COMPLETE:
            return {
                ...state,
                isFetching: false,
                error: null
            }
        case actionTypes.SET_AUTH_ERROR:
            return {
                ...state,
                isFetching: false,
                error: action.payload.error
            }
        case actionTypes.DISABLE_AUTH_ERROR:
            return{
                ...state,
                isFetching:false,
                error:null
            }
        case actionTypes.SET_AUTH_MESSAGE:
            return {
                ...state,
                isFetching: false,
                message: action.payload.message
            }
        case actionTypes.DISABLE_AUTH_MESSAGE:
            return{
                ...state,
                isFetching:false,
                message:null
            }
        
        default:
            return state
    }
}

export default authReducer;