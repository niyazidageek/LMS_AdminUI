import { actionTypes } from "../actions/const";

const initialState = {
  quiz: null,
  quizzes: null,
};

function quizReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_QUIZ_BY_ID:
      return {
        quiz: action.payload,
      };
    case actionTypes.GET_QUIZZES:
      return {
        quizzes: action.payload,
      };
    default:
      return state;
  }
}

export default quizReducer;
