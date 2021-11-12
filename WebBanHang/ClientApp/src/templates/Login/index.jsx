import React, { useEffect } from "react";
import { Route } from "react-router-dom";


const LoginTemplate = (props) => {
    return (
        <>
            {props.children}
        </>
    );
};

const RouterLoginTemplate = ({ path, exact, Component }) => {
    return (
        <Route path={path} exact={exact}>
            <LoginTemplate>
                <Component />
            </LoginTemplate>
        </Route>
    );
};

export default RouterLoginTemplate;