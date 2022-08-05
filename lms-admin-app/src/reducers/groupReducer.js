import { actionTypes } from "../actions/const";

const initialState = {
  group: null,
  groups: null,
  count:null
};

function groupReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_GROUP_BY_ID:
      return {
        group: action.payload,
      };
    case actionTypes.GET_GROUPS:
      return {
        groups: action.payload.data,
        count:action.payload.count
      };
    default:
      return state;
  }
}

export default groupReducer;
