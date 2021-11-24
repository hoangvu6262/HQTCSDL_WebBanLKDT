import React from "react";
import { Route } from "react-router-dom";
import MainHeader from "../../components/MainHeader";
import { makeStyles } from "@mui/styles";
import Announcement from "../../components/Announcement"

const useStyles = makeStyles({
    container: {
        marginTop: 64,
    },
})


const MainTemplate = (props) => {
    const classes = useStyles();

    return (
        <>
            <MainHeader />
            <div className={classes.container}> 
                <Announcement />
            </div>
            
            <main className={classes.main}>
                {props.children}
            </main>   
        </>
    );
};

const RouterMainTemplate = ({ path, exact, Component }) => {
    return (
        <Route path={path} exact={exact}>
            <MainTemplate>
                <Component />
            </MainTemplate>
        </Route>
    );
};

export default RouterMainTemplate;