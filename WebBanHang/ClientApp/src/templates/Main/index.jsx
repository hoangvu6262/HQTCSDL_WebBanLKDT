import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import MainHeader from "../../components/MainHeader";
import { makeStyles } from "@mui/styles";
import { Grid, Container } from "@mui/material"

const useStyles = makeStyles({
    main: {
        
    }
})


const MainTemplate = (props) => {
    const classes = useStyles();

    return (
        <>
            <MainHeader />
            <Container maxWidth="lg">
                <main className={classes.main}>
                    {props.children}
                </main>
            </Container>
            
            
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