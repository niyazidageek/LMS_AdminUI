import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { authCreator } from "../redux/authCreator";

export function useFetch(url){

    const dispatch = useDispatch();
    const [data, setData] = useState({});
    
    useEffect(()=>{
        dispatch(authCreator.setIsFetching());
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
                    dispatch(authCreator.setAuthError(error.response.data.message))
                    dispatch(authCreator.disableIsFetching());
                }
            })
            console.log('async')
    },url);

    return data;

}