import { actionTypes } from "../actions/const";

const initialState = {
  teachers: null,
};

const teacherReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TEACHERS:
      return {
        teachers: action.payload,
      };

    default:
      return state;
  }
};

export default teacherReducer;