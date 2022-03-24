import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { adminRouter, loginRouter, mainRouter } from "./config/router";
import RouterAdminTemplate from "./templates/Admin";
import RouterLoginTemplate from "./templates/Login";
import RouterMainTemplate from "./templates/Main";
import "./custom.css";
import { useSelector } from "react-redux";
import CustomLoginPage from "./pages/Main/Login";
import RegisterPage from "./pages/Main/Register";

export default function App() {
  // render admin route
  const renderAdminRouter = () => {
    return adminRouter.map(({ path, exact, Component }, index) => {
      return (
        <RouterAdminTemplate
          path={path}
          exact={exact}
          Component={Component}
          key={index}
        ></RouterAdminTemplate>
      );
    });
  };

  // render login route
  const renderLoginRouter = () => {
    return loginRouter.map(({ path, exact, Component }, index) => {
      return (
        <RouterLoginTemplate
          path={path}
          exact={exact}
          Component={Component}
          key={index}
        ></RouterLoginTemplate>
      );
    });
  };

  // render main route
  const renderMainRouter = () => {
    return mainRouter.map(({ path, exact, Component }, index) => {
      return (
        <RouterMainTemplate
          path={path}
          exact={exact}
          Component={Component}
          key={index}
        ></RouterMainTemplate>
      );
    });
  };

  const { isCustomorLogin } = useSelector((state) => state.user);

  return (
    <>
      <Router>
        <Switch>
          {renderAdminRouter()}
          {renderLoginRouter()}
          {renderMainRouter()}
          <Route path="/login" exact={false}>
            {isCustomorLogin ? <Redirect to="/" /> : <CustomLoginPage />}
          </Route>
          <Route path="/register" exact={false}>
            {isCustomorLogin ? <Redirect to="/" /> : <RegisterPage />}
          </Route>
        </Switch>
      </Router>
    </>
  );
}
