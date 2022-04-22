import React from "react";
import { Route } from "react-router-dom";
import MainHeader from "../../components/MainHeader";
import MainFooter from "../../components/MainFooter"
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    container: {
        marginTop: 170.86,
    },
    '@media (max-width: 1200px)': {
        container: {
            marginTop: 162.86,

        }
    },
    '@media (max-width: 900px)': {
        container: {
            marginTop: 107.86,

        }
    }
})


const MainTemplate = (props) => {
    const classes = useStyles();

    return (
        <>
            <MainHeader />
            
            <main className={classes.container}>
                {props.children}
            </main>
            <MainFooter />
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