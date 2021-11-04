import { combineReducers } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

import authReducer from "../reducers/authReducer";
import subjectReducer from "./subjectReducer";
import studentReducer from "./studentReducer";
import groupReducer from "./groupReducer";
import lessonReducer from "./lessonReducer";
import quizReducer from "./quizReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authReducer"],
};

const rootReducer = combineReducers({
  authReducer,
  subjectReducer,
  studentReducer,
  groupReducer,
  lessonReducer,
  quizReducer,
});

export default persistReducer(persistConfig, rootReducer);
