import React, { useState, useEffect } from "react";
import AdminHeader from "../../../components/AdminHeader";
import { Paper, Autocomplete, TextField, Grid, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Search from "../../../components/Search";
import BillTable from "./BillTable";
import FormDialog from "../../../components/Dialog";
import { GetBillsPaging, GetBillByStatus } from '../../../redux/actions/bill.action';
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../../components/Notification";
import BillForm from "./BillForm"


const useStyles = makeStyles({
    root: {
        padding: "0 15px !important",
        height: "100%",
        maxWidth: "100%",
        margin: "auto",
        // overflowX: "auto",
    },
    searchPaper: {
        marginTop: 30,
        padding: "10px",
    },
    autocompletePaper: {
        marginTop: 3,
        padding: "10px",
    },
    tablePaper: {
        position: "relative",
        marginTop: 5,
    },
    input: {
        "& .MuiOutlinedInput-root": {
            "& input": {
                padding: 12,
            },
            "& fieldset": {
                border: "none",
            },
        },
    },
});


const options = ["Chờ duyệt", "Đã duyệt", "Đã nhận", "Đã hủy"];

export default function Bill() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { notification, PageNumber } = useSelector((state) => state.bill);

    const [openDialog, setOpenDialog] = useState({
        open: false,
        title: "",
    });

    const [value, setValue] = React.useState("All");

    useEffect(() => {
        if (value === "Chờ duyệt") {
            dispatch(GetBillByStatus(1))
        } else if (value === "Đã duyệt") {
            dispatch(GetBillByStatus(2))
        } else if (value === "Đã nhận") {
            dispatch(GetBillByStatus(3))
        } else if (value === "Đã hủy") {
            dispatch(GetBillByStatus(4))
        } else {
            dispatch(GetBillsPaging(PageNumber, 5))
        }
    }, [value])


    const handleOnlick = () => {
        setOpenDialog({
            open: true,
            title: "Thêm Hóa đơn",
        });
    };

    // close notification
    const handleCloseNotification = () => {
        dispatch({
            type: "CLOSE_NOTIFICATION",
            payload: false,
        });
    };

    return (
        <>
            <Grid container>
                <Grid item xs={12} className={classes.root}>
                    <AdminHeader title="Quản lý Hóa đơn" handleOnlick={handleOnlick} />
                    <Paper className={classes.autocompletePaper}>
                        <Autocomplete
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            id="Category"
                            options={options}
                            sx={{ width: 150 }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder="Category"
                                    size="small"
                                    className={classes.input}
                                />
                            )}
                        />
                    </Paper>
                    <Paper className={classes.tablePaper}>
                        <BillTable />
                    </Paper>
                </Grid>
            </Grid>

            <Notification notifyAlert={notification} onClose={handleCloseNotification} />

            <FormDialog openDialog={openDialog} setOpenDialog={setOpenDialog}>
                <BillForm openDialog={openDialog} setOpenDialog={setOpenDialog}/>
            </FormDialog>
        </>
    );
}