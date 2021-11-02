import { actionTypes } from "../actions/const";

const initialState = {
  group: null,
  groups: null,
};

function groupReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_GROUP_BY_ID:
      return {
        group: action.payload,
      };
    case actionTypes.GET_GROUPS:
      return {
        groups: action.payload,
      };
    default:
      return state;
  }
}

export default groupReducer;
