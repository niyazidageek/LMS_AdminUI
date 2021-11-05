import { actionTypes } from "../actions/const";

const initialState = {
  option: null,
  options: null,
};

function optionReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_OPTIONS:
      return {
        options: action.payload,
      };
    case actionTypes.GET_OPTION_BY_ID:
      return {
        option: action.payload,
      };
    default:
      return state;
  }
}

export default optionReducer;