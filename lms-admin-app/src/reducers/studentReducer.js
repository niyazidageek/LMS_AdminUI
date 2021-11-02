import { actionTypes } from "../actions/const";

const initialState = {
  students: null,
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_STUDENTS:
      return {
        students: action.payload,
      };

    default:
      return state;
  }
};

export default studentReducer;
