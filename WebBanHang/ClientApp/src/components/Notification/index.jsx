import React from "react";
import { Snackbar, Alert } from "@mui/material";
import {  makeStyles } from "@mui/styles";


const useStyles = makeStyles((theme) => ({
    margin: {
        marginTop: 60,
    },
}));

export default function Notification(props) {
    const classes = useStyles();
    const { notifyAlert, onClose, ...other } = props;
    //console.log("notifyAlert", notifyAlert);
    return (
        <Snackbar
            className={classes.margin}
            open={notifyAlert.open}
            onClose={onClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            autoHideDuration={3000}
        >
            <Alert severity={notifyAlert.severity} onClose={onClose}>
                {notifyAlert.message}
            </Alert>
        </Snackbar>
    );
}