import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { PrivateRoute } from "./utils/PrivateRoute";
import Login from "./components/pages/Login/Login";
import Home from "./components/pages/Home/Home";
import Register from "./components/pages/Register/Register";
import RequestResetPassword from "./components/pages/RequestResetPassword/RequestResetPassword";
import ResetPassword from "./components/pages/ResetPassword/ResetPassword";
import ConfirmEmail from "./components/pages/EmailConfirmation/ConfirmEmail";
import { useValidateToken } from "./hooks/useValidateToken";
import { roles } from "./utils/roles";
import MainLayout from "./components/layouts/MainLayout/MainLayout";
import Groups from "./components/pages/Group/Groups";
import GroupDetail from "./components/pages/Group/GroupDetail";
import EditGroup from "./components/pages/Group/EditGroup";
import Subjects from "./components/pages/Subject/Subjects";
import EditSubject from "./components/pages/Subject/EditSubject";
import Lessons from "./components/pages/Lesson/Lessons";
import LessonDetail from "./components/pages/Lesson/LessonDetail";
import EditLesson from "./components/pages/Lesson/EditLesson";
import Quizzes from "./components/pages/Quiz/Quizzes";
import EditQuiz from "./components/pages/Quiz/EditQuiz";
import QuizDetail from "./components/pages/Quiz/QuizDetail";
import Questions from "./components/pages/Question/Questions";
import EditQuestion from "./components/pages/Question/EditQuestion";
import QuestionDetail from "./components/pages/Question/QuestionDetail";
import Options from "./components/pages/Option/Options";
import EditOption from "./components/pages/Option/EditOption";
import OptionDetail from "./components/pages/Option/OptionDetail";
import Editor from "./utils/Editor";
import VideoChat from "./components/pages/VideoChat/VideoChat";

function App() {
  const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);

  useValidateToken();

  return (
    <>
      <Router>
        <Switch>
          <ChakraProvider>
            <Route
              exact
              path="/"
              render={() => {
                return isLoggedIn ? (
                  <Redirect to="/admin/home" />
                ) : (
                  <Redirect to="/login" />
                );
              }}
            />

            <Route path='/editor' component={Editor} />
            <Route path='/videochat' component={VideoChat} />

            <Route path="/login" component={Login} />
            <Route
              path="/requestresetpassword"
              component={RequestResetPassword}
            />
            <Route path="/resetpassword" component={ResetPassword} />
            <Route path="/confirmemail/:id/:token" component={ConfirmEmail} />
            <Route path="/admin">
              <MainLayout>
                <PrivateRoute path="/admin/home" component={Home} />

                <Route path="/admin/groups">
                  <PrivateRoute path="/admin/groups/all" component={Groups} />
                  <PrivateRoute
                    path="/admin/groups/details/:id"
                    component={GroupDetail}
                  />
                  <PrivateRoute
                    path="/admin/groups/edit/:id"
                    component={EditGroup}
                  />
                </Route>

                <Route path="/admin/subjects">
                  <PrivateRoute
                    path="/admin/subjects/all"
                    component={Subjects}
                  />
                  <PrivateRoute
                    path="/admin/subjects/edit/:id"
                    component={EditSubject}
                  />
                </Route>

                <Route path="/admin/lessons">
                  <PrivateRoute path="/admin/lessons/all" component={Lessons} />
                  <PrivateRoute
                    path="/admin/lessons/details/:id"
                    component={LessonDetail}
                  />
                  <PrivateRoute
                    path="/admin/lessons/edit/:id"
                    component={EditLesson}
                  />
                </Route>

                <Route path="/admin/quizzes">
                  <PrivateRoute path="/admin/quizzes/all" component={Quizzes} />
                  <PrivateRoute
                    path="/admin/quizzes/details/:id"
                    component={QuizDetail}
                  />
                  <PrivateRoute
                    path="/admin/quizzes/edit/:id"
                    component={EditQuiz}
                  />
                </Route>

                <Route path="/admin/questions">
                  <PrivateRoute path="/admin/questions/all" component={Questions} />
                  <PrivateRoute
                    path="/admin/questions/details/:id"
                    component={QuestionDetail}
                  />
                  <PrivateRoute
                    path="/admin/questions/edit/:id"
                    component={EditQuestion}
                  />
                </Route>

                <Route path="/admin/options">
                  <PrivateRoute path="/admin/options/all" component={Options} />
                  <PrivateRoute
                    path="/admin/options/details/:id"
                    component={OptionDetail}
                  />
                  <PrivateRoute
                    path="/admin/options/edit/:id"
                    component={EditOption}
                  />
                </Route>

                <PrivateRoute
                  exact
                  path="/admin/register"
                  component={Register}
                  rolesRestriction={[roles.SuperAdmin]}
                />
              </MainLayout>
            </Route>
          </ChakraProvider>
        </Switch>
      </Router>
    </>
  );
}
export default App;
