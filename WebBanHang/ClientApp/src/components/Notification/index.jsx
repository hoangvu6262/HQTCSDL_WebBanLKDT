import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";


const useStyles = makeStyles((theme) => ({
    margin: {
        marginTop: 60,
    },
}));

export default function Notification(props) {
    const classes = useStyles();
    const { notifyAlert, ...other } = props;
    //console.log("notifyAlert", notifyAlert);
    const dispatch = useDispatch()

    const handleCloseNotification = () => {
        dispatch({
            type: "CLOSE_NOTIFICATION",
            payload: false,
        });
    };

    return (
        <Snackbar
            className={classes.margin}
            open={notifyAlert.open}
            onClose={handleCloseNotification}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            autoHideDuration={3000}
        >
            <Alert severity={notifyAlert.severity} onClose={handleCloseNotification}>
                {notifyAlert.message}
            </Alert>
        </Snackbar>
    );
}