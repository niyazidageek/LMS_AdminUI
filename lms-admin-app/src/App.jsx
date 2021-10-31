import React, { useEffect } from "react";
import axios from 'axios'
import { useSelector, useDispatch } from "react-redux";
import { authCreator } from "./redux/authCreator";
import { BrowserRouter as Router, Switch, Redirect, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import {PrivateRoute} from "./utils/PrivateRoute";
import Login from "./components/pages/Login/Login";
import Home from "./components/pages/Home/Home";
import Register from "./components/pages/Register/Register";
import RequestResetPassword from "./components/pages/RequestResetPassword/RequestResetPassword";
import ResetPassword from "./components/pages/ResetPassword/ResetPassword";
import ConfirmEmail from "./components/pages/EmailConfirmation/ConfirmEmail";
import { useValidateToken } from "./hooks/useValidateToken";
import {roles} from './utils/roles'
import MainLayout from "./components/layouts/MainLayout/MainLayout";
import Groups from "./components/pages/Groups/Groups";
import GroupDetail from "./components/pages/Groups/GroupDetail"
import EditGroup from "./components/pages/Groups/EditGroup";
import testpage from "./components/pages/Login/testpage";

function App() {
  
  const isLoggedIn = useSelector(state=>state.authReducer.isLoggedIn);

  useValidateToken();

  return (
    <>
    <Router>
          <Switch>
          <ChakraProvider>
              <Route
              exact
              path="/"
              render={()=>{
                return(
                  isLoggedIn ? 
                  <Redirect to='/admin/home' /> :
                  <Redirect to='/login' />
                )
              }} 
              />
              <Route path="/login" component={Login}/>
              <Route path="/test" component={testpage}/>
              <Route path="/requestresetpassword" component={RequestResetPassword}/>
              <Route path="/resetpassword" component={ResetPassword}/>
              <Route path="/confirmemail/:id/:token" component={ConfirmEmail} />
              <Route path="/admin">
                <MainLayout>
                  <PrivateRoute path="/admin/home" component={Home}/>
                    <Route path="/admin/groups">
                    <PrivateRoute path="/admin/groups/all" component={Groups} />
                    <PrivateRoute path="/admin/groups/details/:id" component={GroupDetail}/>
                    <PrivateRoute path="/admin/groups/edit/:id" component={EditGroup} />
                    </Route>
                  <PrivateRoute exact path="/admin/register" component={Register} rolesRestriction={[roles.SuperAdmin]}/>
                </MainLayout>
              </Route>
            </ChakraProvider>
          </Switch>
      </Router>
    </>
  );
}
export default App;
