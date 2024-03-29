import { actionTypes } from "./const";
import { signIn, signUp, requestResetPassword, resetPassword, sendConfirmEmail, confirmEmail } from "../services/authService";

export const signInAction = (data) => async (dispatch) =>{
    try {

        dispatch({
            type:actionTypes.SET_IS_FETCHING
        })
        
        let resp = await signIn(data);

        if(data.rememberMe){
            dispatch({
                type:actionTypes.SET_USER,
                payload:resp.data
            })
        }
        else{
            let date = new Date;
            date = new Date(date.getTime()+120*60000);
            date = date.toISOString();
            resp.data.expiryDate = date;
            dispatch({
                type:actionTypes.SET_USER,
                payload:resp.data
            })
        }
       
        dispatch({
            type:actionTypes.DISABLE_IS_FETCHING
        })

    } catch (error) {

        if(error.message === "Network Error"){
            dispatch({
                type:actionTypes.SET_AUTH_ERROR,
                payload:error
            })
        }
        else{
            dispatch({
                type:actionTypes.SET_AUTH_ERROR,
                payload:error.response.data
            })
        }   
        dispatch({
            type:actionTypes.DISABLE_IS_FETCHING
        })
    }
}


export const signUpAction = (data,token) => async (dispatch) =>{
    try {

        let roles=[];
        data.roles.map(r=>roles.push(r.value))

        data.roles = roles
        dispatch({
            type: actionTypes.SET_IS_FETCHING
        })

        let resp = await signUp(data, token);

        dispatch({
            type:actionTypes.DISABLE_IS_FETCHING
        })

        dispatch({
            type:actionTypes.SET_AUTH_MESSAGE,
            payload:resp.data
        })

    } catch (error) {

        if(error.message === "Network Error" || error.message == "Request failed with status code 401"){
            dispatch({
                type:actionTypes.SET_AUTH_ERROR,
                payload:error
            })
        }
        else{
            dispatch({
                type:actionTypes.SET_AUTH_ERROR,
                payload:error.response.data
            })
        }
        dispatch({
            type:actionTypes.DISABLE_IS_FETCHING
        });   
    }
}

export const logOutAction = () => (dispatch) => {
    dispatch({
        type:actionTypes.LOG_OUT
    })
}

export const requestResetPasswordAction = (data) => async (dispatch) =>{
    try {
        dispatch({
            type:actionTypes.SET_IS_FETCHING
        })
    
        const resp = await requestResetPassword(data);
    
        dispatch({
            type:actionTypes.SET_AUTH_MESSAGE,
            payload:resp.data
        })

        dispatch({
            type:actionTypes.DISABLE_IS_FETCHING
        })

    } catch (error) {
        if(error.message === "Network Error"){
            dispatch({
                type:actionTypes.SET_AUTH_ERROR,
                payload:error
            })
        }
        else{
            dispatch({
                type:actionTypes.SET_AUTH_ERROR,
                payload:error.response.data
            })
        }   
        dispatch({
            type:actionTypes.DISABLE_IS_FETCHING
        })
    }
}


export const resetPasswordAction = (data) => async (dispatch) => {
    try {
        dispatch({
            type:actionTypes.SET_IS_FETCHING
        })

        const resp = await resetPassword(data);

        dispatch({
            type:actionTypes.SET_AUTH_MESSAGE,
            payload:resp.data
        })

        dispatch({
            type:actionTypes.DISABLE_IS_FETCHING
        })

    } catch (error) {
        console.log(error);
        if(error.message === "Network Error"){
            dispatch({
                type:actionTypes.SET_AUTH_ERROR,
                payload:error
            })
        }
        else{
            dispatch({
                type:actionTypes.SET_AUTH_ERROR,
                payload:error.response.data
            })
        }   
        dispatch({
            type:actionTypes.DISABLE_IS_FETCHING
        })
    }
}


export const sendConfirmEmailAction = (data) =>  async (dispatch) => {
    try {
        dispatch({
            type:actionTypes.SET_IS_FETCHING
        })

        const resp = await sendConfirmEmail(data);

        dispatch({
            type:actionTypes.SET_AUTH_MESSAGE,
            payload:resp.data
        })

        dispatch({
            type:actionTypes.DISABLE_IS_FETCHING
        })

    } catch (error) {
        if(error.message === "Network Error"){
            dispatch({
                type:actionTypes.SET_AUTH_ERROR,
                payload:error
            })
        }
        else{
            dispatch({
                type:actionTypes.SET_AUTH_ERROR,
                payload:error.response.data
            })
        }   
        dispatch({
            type:actionTypes.DISABLE_IS_FETCHING
        })
    }
}

export const confirmEmailAction = (data) => async (dispatch)=>{
    try {

        dispatch({
            type:actionTypes.SET_IS_FETCHING
        })

        const resp = await confirmEmail(data);

        dispatch({
            type:actionTypes.SET_AUTH_MESSAGE,
            payload:resp.data
        })

        dispatch({
            type:actionTypes.DISABLE_IS_FETCHING
        })
        
    } catch (error) {
        if(error.message === "Network Error"){
            dispatch({
                type:actionTypes.SET_AUTH_ERROR,
                payload:error
            })
        }
        else{
            dispatch({
                type:actionTypes.SET_AUTH_ERROR,
                payload:error.response.data
            })
        }   
        dispatch({
            type:actionTypes.DISABLE_IS_FETCHING
        })
    }
}