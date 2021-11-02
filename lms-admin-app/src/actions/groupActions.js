import {
  createGroup,
  getGroupById,
  getGroups,
  updateGroup,
} from "../services/groupService";
import { getSubjects } from "../services/subjectService";
import { actionTypes } from "./const";

export const getGroupByIdAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.SET_IS_FETCHING,
    });

    let resp = await getGroupById(id);

    dispatch({
      type: actionTypes.GET_GROUP_BY_ID,
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

export const createGroupAction = (data, token) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.SET_IS_FETCHING,
    });

    let resp = await createGroup(data, token);

    dispatch({
      type: actionTypes.SET_AUTH_MESSAGE,
      payload: resp.data,
    });

    await dispatch(getGroupsAction());

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

export const updateGroupAction = (data, id, token) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.SET_IS_FETCHING,
    });

    let resp = await updateGroup(data, id, token);

    dispatch({
      type: actionTypes.SET_AUTH_MESSAGE,
      payload: resp.data,
    });

    await dispatch(getGroupByIdAction(id));

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

export const getGroupsAction = () => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.SET_IS_FETCHING,
    });

    let resp = await getGroups();

    dispatch({
      type: actionTypes.GET_GROUPS,
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
