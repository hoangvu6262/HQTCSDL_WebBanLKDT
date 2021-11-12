import React from "react";
import { useDispatch } from "react-redux";
import { Grid, TextField, Button, InputAdornment } from "@mui/material";
import { makeStyles } from "@mui/styles";
// import { Form } from "../../../components/useForm";
import { PutConfirmReceived, PutConfirmCanceled, PutAdConfirm } from "../../../redux/actions/bill.action"

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 20,
    },
    formInput: {
        marginBottom: "20px !important",
    }
}));



export default function BillForm(props) {
    const { openDialog, setOpenDialog } = props;
    const classes = useStyles();
    const dispatch = useDispatch();


    return (
        <>
            Cập nhật trạng thái
        </>
    );
}
