import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Container,
} from "@mui/material";
import Notification from "../../../components/Notification";
import { makeStyles } from "@mui/styles";
import LoginForm from "../../../components/LoginForm"
import loginWallpaper from "../../../assets/img/loginWallpaper.jpg"


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage:
            `linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.6)),url(${loginWallpaper})`,
        width: "100vw",
        height: "102.5vh",
        //paddingBottom: 180,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        display: "flex !important",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },

    loginPageContent: {
        display: "flex !important",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    logo: {
        padding: "45px 0",
        width: "90%",
        margin: "-20px auto auto auto",
        // background: "linear-gradient(60deg, #ec407a, #d81b60)",
        background: "linear-gradient(120deg, #5252d4, #5252d4)",
        borderRadius: 6,
        display: "flex !important",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        "& p": {
            marginBottom: "0",
            color: "#fff",
            fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
        }
    },
    formLogin: {
        borderRadius: "10px",
        width: "360px",
        height: "auto",
        backgroundColor: "#fff",
    },


}));

export default function CustomLoginPage(props) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { notification } = useSelector((state) => state.user);

    const handleCloseNotification = () => {
        dispatch({
            type: "CLOSE_NOTIFICATION",
            payload: false,
        });
    };
    return (
        <div className={classes.root}>
            <Container maxWidth="md" className={classes.loginPageContent}>
                <div className={classes.formLogin}>
                    <div className={classes.logo}>
                        <p>LOGIN</p>
                    </div>
                    <LoginForm isAdmin={false} />
                </div>
            </Container>

            <Notification notifyAlert={notification} onClose={handleCloseNotification} />
        </div>
    );
}
