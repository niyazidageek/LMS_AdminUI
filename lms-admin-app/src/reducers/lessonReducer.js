import { actionTypes } from "../actions/const";

const initialState = {
  lesson: null,
  lessons: null,
};

function lessonReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_LESSONS:
      return {
        lessons: action.payload,
      };
    case actionTypes.GET_LESSON_BY_ID:
      return {
        lesson: action.payload,
      };
    default:
      return state;
  }
}

export default lessonReducer;