import { actionTypes } from "../actions/const";

const initialState = {
  subjects: null,
};

const subjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SUBJECTS:
      return {
        subjects: action.payload,
      };

    default:
      return state;
  }
};

export default subjectReducer;
