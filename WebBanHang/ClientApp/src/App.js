import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import {adminRouter } from "./config/router";
import RouterAdminTemplate from "./templates/Admin";

import './custom.css'

export default class App extends Component {
  static displayName = App.name;
    render() {
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
    return (
      <>
            <Router>
                <Switch>
                    {renderAdminRouter()}
                </Switch>
            </Router>
      </>
    );
  }
}
