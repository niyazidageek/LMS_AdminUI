import {
  createQuiz,
  getQuizById,
  getQuizzes,
  updateQuiz,
} from "../services/quizService";
import { actionTypes } from "./const";

export const getQuizByIdAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.SET_IS_FETCHING,
    });

    let resp = await getQuizById(id);

    dispatch({
      type: actionTypes.GET_QUIZ_BY_ID,
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

export const createQuizAction = (data, token) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.SET_IS_FETCHING,
    });

    let resp = await createQuiz(data, token);

    dispatch({
      type: actionTypes.SET_AUTH_MESSAGE,
      payload: resp.data,
    });

      await dispatch(getQuizzesAction());

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

export const updateQuizAction = (data, id, token) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.SET_IS_FETCHING,
    });

    let resp = await updateQuiz(data, id, token);

    dispatch({
      type: actionTypes.SET_AUTH_MESSAGE,
      payload: resp.data,
    });

      await dispatch(getQuizByIdAction(id));

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

export const getQuizzesAction = () => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.SET_IS_FETCHING,
    });

    let resp = await getQuizzes();

    dispatch({
      type: actionTypes.GET_QUIZZES,
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
