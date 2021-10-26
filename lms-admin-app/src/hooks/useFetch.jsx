import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { authCreator } from "../redux/authCreator";

export function useFetch(url){

    const dispatch = useDispatch();
    const [data, setData] = useState(null);
    
    useEffect(()=>{
        dispatch(authCreator.setIsFetching());
        console.log('rendering');
            axios.get(url)
            .then(response=>{
                setData(response.data);
                dispatch(authCreator.disableIsFetching());
            })
            .catch(error=>{
                if(error.message == "Network Error" || error.message == "Request failed with status code 401"){
                    dispatch(authCreator.setAuthError(error.message));
                    dispatch(authCreator.disableIsFetching());
                }
                else{
                    console.log(error)
                    dispatch(authCreator.setAuthError(error.response.data.message))
                    dispatch(authCreator.disableIsFetching());
                }
            })
    },[url]);
    return [data];
}