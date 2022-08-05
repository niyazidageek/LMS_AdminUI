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
import Applications from "./components/pages/Application/Applications";

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
                  <Redirect to="/admin/groups/all" />
                ) : (
                  <Redirect to="/login" />
                );
              }}
            />

            <Route path="/login" component={Login} />
            <Route
              path="/requestresetpassword"
              component={RequestResetPassword}
            />
            <Route path="/resetpassword" component={ResetPassword} />
            <Route path="/confirmemail/:id/:token" component={ConfirmEmail} />
            <Route path="/admin">
              <MainLayout>
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

                <Route path="/admin/applications">
                  <PrivateRoute
                    path="/admin/applications/all"
                    component={Applications}
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
