import { getSubjects, getSubjectById, updateSubject, createSubject, getSubjectsByPageAndSize, deleteSubjectById } from "../services/subjectService";
import { actionTypes } from "./const";

export const getSubjectsAction = () => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.SET_IS_FETCHING,
    });

    let resp = await getSubjects();

    dispatch({
      type: actionTypes.GET_SUBJECTS,
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


export const getSubjectByIdAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.SET_IS_FETCHING,
    });

    let resp = await getSubjectById(id);

    dispatch({
      type: actionTypes.GET_SUBJECT_BY_ID,
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


export const updateSubjectAction = (data, id, token) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.SET_IS_FETCHING,
    });

    let resp = await updateSubject(data, id, token);

    dispatch({
      type: actionTypes.SET_AUTH_MESSAGE,
      payload:resp.data
    });

    await dispatch(getSubjectByIdAction(id));

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


export const createSubjectAction = (data, token) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.SET_IS_FETCHING,
    });

    let resp = await createSubject(data, token);

    dispatch({
      type: actionTypes.SET_AUTH_MESSAGE,
      payload:resp.data
    });

    await dispatch(getSubjectsAction());

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


export const getSubjectsByPageAndSizeAction = (page, size) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.SET_IS_FETCHING,
    });

    let resp = await getSubjectsByPageAndSize(page, size);
    
    let payload = {
      data:resp.data,
      count:resp.headers['count']
    }

    dispatch({
      type: actionTypes.GET_SUBJECTS_BY_PAGE_AND_SIZE,
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

export const deleteSubjectByIdAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.SET_IS_FETCHING,
    });

    let resp = await deleteSubjectById(id);

    dispatch({
      type: actionTypes.SET_AUTH_MESSAGE,
      payload:resp.data
    });

    await dispatch(getSubjectsAction());

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