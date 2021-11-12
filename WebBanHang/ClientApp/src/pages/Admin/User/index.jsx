import React, { useState, useEffect } from "react";
import AdminHeader from "../../../components/AdminHeader";
import { Paper, Autocomplete, TextField, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Search from "../../../components/Search";
import UsersTable from "./UserTable"
import FormDialog from "../../../components/Dialog";
import UserForm from "./UserForm";
import UserFormUpdate from "./UserFormUpdate";
import { GetAllUserPaging, SearchUserByName } from '../../../redux/actions/user.action';
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../../components/Notification"


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

//const options = ["Bàn phím", "Chuột", "Màn hình", "Tai nghe"];

export default function User() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { notification, PageNumber } = useSelector((state) => state.user);

    const [openDialog, setOpenDialog] = useState({
        open: false,
        isAddUser: false,
        title: "",
    });

    const [openDialogUpdate, setOpenDialogUpdate] = useState({
        open: false,
        title: "Cập nhật user",
        user: {
            tenDangNhap: "",
            matKhau: "",
            ten: "",
            anhDaiDien: "",
            email: "",
            diaChi: "",
            sdt: ""
        }
    })


    const handleSearchUsers = (e) => {
        console.log(e.target.value);

        if (e.target.value !== "") {
            dispatch(SearchUserByName(e.target.value))
        } else {
            dispatch(GetAllUserPaging(PageNumber, 3))
        }
    }

    const handleOnlick = () => {
        setOpenDialog({
            open: true,
            isAddUser: true,
            title: "Thêm User",
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
                    <AdminHeader title="Quản lý User" handleOnlick={handleOnlick} />
                    <Paper className={classes.searchPaper}>
                        <Search
                            id="search"
                            name="search"
                            placeholder="Search User by Name..."
                            onChange={handleSearchUsers}
                        />
                    </Paper>
                    <Paper className={classes.autocompletePaper}>
                        {/*<Autocomplete
                            //value={value}
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
                        />*/}
                    </Paper>
                    <Paper className={classes.tablePaper}>
                        <UsersTable openDialog={openDialogUpdate} setOpenDialog={setOpenDialogUpdate}/>
                    </Paper>
                </Grid>
            </Grid>

            <Notification notifyAlert={notification} onClose={handleCloseNotification} />

            <FormDialog openDialog={openDialog} setOpenDialog={setOpenDialog}>
                <UserForm openDialog={openDialog} setOpenDialog={setOpenDialog}/>
            </FormDialog>

            <FormDialog openDialog={openDialogUpdate} setOpenDialog={setOpenDialogUpdate}>
                <UserFormUpdate openDialog={openDialogUpdate} setOpenDialog={setOpenDialogUpdate} />
            </FormDialog>
        </>
    );
}