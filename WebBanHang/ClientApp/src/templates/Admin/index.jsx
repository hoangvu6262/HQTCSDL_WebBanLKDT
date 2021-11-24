import React from "react";
import { Route } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { useSelector } from "react-redux";
import LoginPage from "../../pages/Admin/Login"

const AdminTemplate = (props) => {
    const { isAdminLogin } = useSelector(state => state.user)
    
    if (!isAdminLogin) {
        return (<LoginPage />)
    } else {
        return (
            <div>
                <Sidebar>
                    <main style={{ marginTop: 60 }}>
                        <section>{props.children}</section>
                    </main>
                </Sidebar>
            </div>
        );
    }

  
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
