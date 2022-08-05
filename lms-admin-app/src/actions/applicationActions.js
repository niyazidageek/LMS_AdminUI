import { deleteApplicationById, getApplicationById, getApplicationsByPageAndSize } from "../services/applicationService";
import { actionTypes } from "./const";


export const getApplicationByIdAction = (id, token) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.SET_IS_FETCHING,
    });

    let resp = await getApplicationById(id, token);

    dispatch({
      type: actionTypes.GET_APPLICATION_BY_ID,
      payload: resp.data,
    });

    dispatch({
      type: actionTypes.DISABLE_IS_FETCHING,
    });
  } catch (error) {
    if (error.message === "Network Error") {
      dispatch({
        type: actionTypes.SET_AUTH_ERROR,
        payload: error,
      });
    } else {
      dispatch({
        type: actionTypes.SET_AUTH_ERROR,
        payload: error.response.data,
      });
    }
    dispatch({
      type: actionTypes.DISABLE_IS_FETCHING,
    });
  }
};



export const getApplicationsByPageAndSizeAction = (page, size, token) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.SET_IS_FETCHING,
    });

    let resp = await getApplicationsByPageAndSize(page, size, token);
    
    let payload = {
      data:resp.data,
      count:resp.headers['count']
    }

    dispatch({
      type: actionTypes.GET_APPLICATIONS_BY_PAGE_AND_SIZE,
      payload: payload,
    });

    dispatch({
      type: actionTypes.DISABLE_IS_FETCHING,
    });
  } catch (error) {
    if (error.message === "Network Error") {
      dispatch({
        type: actionTypes.SET_AUTH_ERROR,
        payload: error,
      });
    } else {
      dispatch({
        type: actionTypes.SET_AUTH_ERROR,
        payload: error.response.data,
      });
    }
    dispatch({
      type: actionTypes.DISABLE_IS_FETCHING,
    });
  }
};


export const deleteApplicationByIdAction = (id, token) => async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.SET_IS_FETCHING,
      });
  
      let resp = await deleteApplicationById(id, token);
  
      dispatch({
        type: actionTypes.GET_APPLICATION_BY_ID,
        payload: resp.data,
      });
  
      dispatch({
        type: actionTypes.DISABLE_IS_FETCHING,
      });

      return resp;
    } catch (error) {
      if (error.message === "Network Error") {
        dispatch({
          type: actionTypes.SET_AUTH_ERROR,
          payload: error,
        });
      } else {
        dispatch({
          type: actionTypes.SET_AUTH_ERROR,
          payload: error.response.data,
        });
      }
      dispatch({
        type: actionTypes.DISABLE_IS_FETCHING,
      });
    }
  };
  