import { actionTypes } from "../actions/const";

const initialState = {
  subjects: null,
  subject:null,
  count:null
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
    case actionTypes.GET_SUBJECTS_BY_PAGE_AND_SIZE:
    return {
      subjects: action.payload.data,
      count:action.payload.count
    };
    default:
      return state;
  }
};

export default subjectReducer;
