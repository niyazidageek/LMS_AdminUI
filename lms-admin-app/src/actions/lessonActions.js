import {
    createGroup,
    getGroupById,
    getGroups,
    updateGroup,
  } from "../services/groupService";
  import { getLessons, getLessonById, createLesson, updateLesson } from "../services/lessonService";
  import { actionTypes } from "./const";
  
  export const getLessonByIdAction = (id) => async (dispatch) => {
    console.log('dang')
    try {
      dispatch({
        type: actionTypes.SET_IS_FETCHING,
      });
  
      let resp = await getLessonById(id);
  
      dispatch({
        type: actionTypes.GET_LESSON_BY_ID,
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
  
  export const createLessonAction = (data, token) => async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.SET_IS_FETCHING,
      });
  
      let resp = await createLesson(data, token);
  
      dispatch({
        type: actionTypes.SET_AUTH_MESSAGE,
        payload: resp.data,
      });

      await dispatch(getLessonsAction())
    
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
  
  export const updateLessonAction = (data, id, token) => async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.SET_IS_FETCHING,
      });
  
      let resp = await updateLesson(data, id, token);
  
      dispatch({
        type: actionTypes.SET_AUTH_MESSAGE,
        payload: resp.data,
      });
  
      await dispatch(getLessonByIdAction(id));
  
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
  
  export const getLessonsAction = () => async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.SET_IS_FETCHING,
      });
  
      let resp = await getLessons();
  
      dispatch({
        type: actionTypes.GET_LESSONS,
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
  