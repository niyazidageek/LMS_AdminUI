import { getSubjects } from "../services/subjectService";
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
