import { getTeachers } from "../services/teacherService";
import { actionTypes } from "./const";

export const getTeachersAction = () => async (dispatch)=>{
    try {
        dispatch({
            type:actionTypes.SET_IS_FETCHING
        })

        let resp = await getTeachers();

        dispatch({
            type:actionTypes.GET_TEACHERS,
            payload: resp.data
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
            console.log(error)
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