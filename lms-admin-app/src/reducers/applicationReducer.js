import { actionTypes } from "../actions/const";

const initialState = {
  application: null,
  applications:null,
  count:null
};

const applicationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_APPLICATION_BY_ID:
      return {
        application: action.payload,
      };
    case actionTypes.GET_APPLICATIONS_BY_PAGE_AND_SIZE:
    return {
      applications: action.payload.data,
      count:action.payload.count
    };
    default:
      return state;
  }
};

export default applicationReducer;
