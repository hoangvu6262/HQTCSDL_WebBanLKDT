import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { adminRouter, loginRouter } from "./config/router";
import RouterAdminTemplate from "./templates/Admin";
import RouterLoginTemplate from "./templates/Login"
import './custom.css'

export default class App extends Component {
  static displayName = App.name;
    render() {
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

    return (
      <>
            <Router>
                <Switch>
                    {renderAdminRouter()}
                    {renderLoginRouter()}
                </Switch>
            </Router>
      </>
    );
  }
}
