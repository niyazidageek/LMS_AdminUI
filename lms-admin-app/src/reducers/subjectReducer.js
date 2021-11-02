import { actionTypes } from "../actions/const";

const initialState = {
  subjects: null,
  subject:null
};

const subjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SUBJECTS:
      return {
        subjects: action.payload,
      };
    case actionTypes.GET_SUBJECT_BY_ID:
    return {
      subject: action.payload,
    };
    default:
      return state;
  }
};

export default subjectReducer;
