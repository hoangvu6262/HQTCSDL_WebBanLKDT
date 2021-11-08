import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

const AdminTemplate = (props) => {
  return (
    <div>
      <Sidebar>
        <main style={{ marginTop: 60 }}>
          <section>{props.children}</section>
        </main>
      </Sidebar>
    </div>
  );
};

const RouterAdminTemplate = ({ path, exact, Component }) => {
  return (
    <Route path={path} exact={exact}>
      <AdminTemplate>
        <Component />
      </AdminTemplate>
    </Route>
  );
};

export default RouterAdminTemplate;
