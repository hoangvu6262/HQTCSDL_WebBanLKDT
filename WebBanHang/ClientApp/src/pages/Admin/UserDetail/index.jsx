import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetUserDetail } from "../../../redux/actions/user.action";
import { Grid, Paper, Divider, Container, Box, Chip, Button, AppBar, } from '@mui/material';
import { makeStyles } from "@mui/styles";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';



const useStyle = makeStyles({
    root: {
        padding: "10px 25px",
        "& h2": {
            marginBottom: 0,
            // paddingLeft: 15,
            fontSize: 50,
            fontWeight: 700,
            color: "rgb(33, 43, 54)",
            fontFamily: "'Dongle', sans- serif",
            //   textTransform: "uppercase",
        },
        fontFamily: "'Dongle', sans- serif",
        fontSize: 20,
    },
    userDetailHeader: {
        marginBottom: 10,

    },
    userDetailContent: {
        marginTop: 20,
        height: 600,
        padding: "20px",
        borderRadius: 10,
        boxShadow: "rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px !important",
    },

    userInfoAccount: {
        margin: "48px auto",
        width: 370,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
    },
    userInfoAccountIcon: {
        fontSize: "370px !important",
        textAlign: "center",
        color: "#2771b0",
    },
    userInfoAccountContent: {
        fontWeight: "400",
        textAlign: "center",
        fontSize: 35,
        // fontFamily: `"Roboto","Helvetica","Arial",sans-serif`,
    },

    userInfoProfile: {
        margin: "20px auto",
        padding: "0 15px",
    },
    userInfoProfileLabel: {
        fontSize: 23,
        fontWeight: "400",
        marginBottom: "0px !important",
        "& p": {       
            marginBottom : "0px !important",
        }
    },
    userInfoProfileValue: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottom: "1px solid #999",
        "&:hover": {
            borderBottom: "1px solid #9c27b0",
        },
        "& p": {
            fontSize: 25,
            marginBottom: "0px !important",
        }
    },

    userDetailDiscription: {
        marginTop: 25,
        paddingBottom: 10,
        borderRadius: 10,
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        "& p": {
            padding: "20px",
            marginBottom: 0,
            // paddingLeft: 15,
            fontSize: 15,
            fontWeight: 400,
            color: "rgb(33, 43, 54)",
            fontFamily: "'Public Sans', sans- serif !important",
        },
    },
    appbar: {
        padding: "10px 20px",
        borderRadius: "10px 10px 0 0",
        backgroundColor: "rgb(244 246 248) !important",
        color: "rgb(33, 43, 54) !important",
        fontWeight: 600,
        fontSize: 25,
        boxShadow: "none !important",
    },
    comment: {
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        "& p": {
            marginBottom: "0px !important",
            paddingTop: 0,
            paddingBottom: 0,
            // paddingLeft: 15,
            fontSize: 15,
            fontWeight: 400,
            color: "rgb(33, 43, 54)",
            //   textTransform: "uppercase",
        },
    }
})

const UserDetail = () => {
    const classes = useStyle();
    const { id } = useParams();
    const dispatch = useDispatch();

    const { userDetail } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(GetUserDetail(id))
    }, []);

    console.log(userDetail);

    const profifes = [
        {
            id: 1,
            name: "User ID:",
            value: userDetail.maKhachHang,
            pIcon: AccountCircleOutlinedIcon,
        },
        {
            id: 2,
            name: "Name:",
            value: userDetail.ten,
            pIcon: FaceOutlinedIcon,
        },
        { id: 3, name: "Email:", value: userDetail.email, pIcon: ContactMailOutlinedIcon },
        {
            id: 4,
            name: "Phone Number:",
            value: userDetail.sdt,
            pIcon: PhoneIphoneOutlinedIcon,
        },
        {
            id: 5,
            name: "Address:",
            value: userDetail.diaChi,
            pIcon: BusinessOutlinedIcon,
        },
        {
            id: 6,
            name: "Role:",
            value: `${userDetail.isAdmin ? "Admin" : "Customor"}`,
            pIcon: AdminPanelSettingsOutlinedIcon,
        },
    ];

    //const comments = productDetail.binhLuans;

    const renderListComments = (comments) => {
        return comments.map((comment) => {
            return (
                <div className={classes.comment} key={comment.maBl}>
                    <div>
                        <p>Mã Khách Hàng: {comment.maKhachHang} - {comment.thoiGian} </p>
                        <p> {comment.noiDungBinhLuan} </p>
                    </div>

                    <p>
                        <Button variant="outlined" color="error" fullWidth>X</Button>
                    </p>
                </div>
            );
        })

    }


    return (
        <>
            <Container className={classes.root}>
                <Box className={classes.userDetailHeader}>
                    <h2>User Detail</h2>
                </Box>
                <Divider />
                <Grid container spacing={ 2}>
                    <Grid item md={6} xs={12} >
                        <Paper className={classes.userDetailContent}>
                        <div className={classes.userInfoAccount}>
                            <AccountCircleOutlinedIcon
                                className={classes.userInfoAccountIcon}
                            />
                            <p className={classes.userInfoAccountContent}>
                                Username: {userDetail.tenDangNhap}
                            </p>
                            </div>
                        </Paper>
                    </Grid>

                    <Grid item md={6} xs={12}>
                        <Paper className={classes.userDetailContent}>
                        {profifes.map((profifes) => {
                            return (
                                <div className={classes.userInfoProfile} key={profifes.id}>
                                    <p className={classes.userInfoProfileLabel}>
                                        {profifes.name}
                                    </p>
                                    <div className={classes.userInfoProfileValue}>
                                        <p> {profifes.value}</p>
                                        <profifes.pIcon />
                                    </div>
                                </div>
                            );
                        })}
                        </Paper>
                    </Grid>
                </Grid>
                
                    


                
                <Box className={classes.userDetailDiscription}>
                    <AppBar position="static" className={classes.appbar}>
                        Orders
                    </AppBar>
                    <p></p>
                </Box>
                <Box className={classes.userDetailDiscription}>
                    <AppBar position="static" className={classes.appbar}>
                        Comments
                    </AppBar>
                    {userDetail.binhLuans == null ? (<p>Hiện khách hàng chưa bình luận về sản phẩm nào.</p>) : renderListComments(userDetail.binhLuans)}
                </Box>

            </Container>

        </>
    );
}
export default UserDetail;