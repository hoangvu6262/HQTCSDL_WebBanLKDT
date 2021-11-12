import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import LoginPage from "../../pages/Admin/Login"

const AdminTemplate = (props) => {
    const dispatch = useDispatch();
    const { isAdminLogin } = useSelector(state => state.user)

    const adminLogin = JSON.parse(localStorage.getItem("adminLogin"));

    useEffect(() => {
        if (adminLogin) {
            dispatch({
                type: "ADMIN_LOGIN_AUTO",
                payload: true,
            });
        }
    }, [adminLogin]);

    
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
