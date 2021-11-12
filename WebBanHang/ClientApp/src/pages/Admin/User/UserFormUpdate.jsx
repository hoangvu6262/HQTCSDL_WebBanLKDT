import React, { useState, useEffect} from "react";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { Grid, TextField, Button, InputAdornment, Switch } from "@mui/material";
import { makeStyles, withStyles } from "@mui/styles";
import { Formik } from "formik";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { UpdateUser, SetAdminRole } from "../../../redux/actions/user.action"
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 20,
    },
    formInput: {
        marginBottom: "20px !important",
    }
}));

const CssTextField = withStyles({
    root: {
        // backgroundColor: "#293556",
        height: 60,
        "& .MuiInputBase-input": {
            height: "2rem",
            fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
            padding: "3px 12px",
            fontSize: 13,
        },
        "& input": {
            color: "#495057",
            fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
        },

        "& .MuiOutlinedInput-root": {
            "& input": {
                padding: 15,
            },
        },
    },
})(TextField);

const validationSchema = yup.object({
    tenDangNhap: yup
        .string("Nhập tên đăng nhập")
        .required("Vui lòng thêm tên đăng nhập"),
    matKhau: yup
        .string("Nhập mật khẩu.")
        .required("Vui lòng phải thêm mật khẩu"),
    ten: yup.string("Nhập họ tên.").required("Vui lòng thêm họ tên."),
    anhDaiDien: yup
        .string("Thêm hình ảnh cho sản phẩm.")
        .required("Vui lòng phải thêm hình ảnh cho phim."),
    email: yup.string("Thêm Email").required("Vui lòng thêm Email."),
    diaChi: yup
        .string("Thêm địa chỉ."),
    sodt: yup
        .string("Thêm số điện thoại.")
        
});


export default function UserFormUpdate(props) {
    const { openDialog, setOpenDialog } = props;
    const { user } = openDialog;
    const classes = useStyles();
    const dispatch = useDispatch();

    const [checked, setChecked] = useState(false);

    const [iValue, setIValue] = useState({
        tenDangNhap: "",
        matKhau: "",
        ten: "",
        anhDaiDien: "",
        email: "",
        diaChi: "",
        sdt: ""
    });

    const handleChangeAdmin = (event) => {
        setChecked(event.target.checked);
        //console.log(user.maKhachHang);
        dispatch(SetAdminRole(user.maKhachHang))
    };

    useEffect(() => {
        setIValue({
            ...iValue,
            tenDangNhap: user.tenDangNhap ?? "",
            matKhau: user.matKhau ?? "",
            ten: user.ten ?? "",
            anhDaiDien: user.anhDaiDien ?? "",
            email: user.email ?? "",
            diaChi: user.diaChi ?? "",
            sdt: user.sdt ?? ""
        });
    }, [openDialog]);

    useEffect(() => {
        setChecked(user.isAdmin);
    }, [openDialog]);


    return (
        <>
            <Formik
                enableReinitialize
                initialValues={iValue}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log(values);
                    console.log(user.maKhachHang);
                    dispatch(UpdateUser(user.maKhachHang, values, openDialog, setOpenDialog));
                }}
            >
                {(formik) => (
                    <form
                        onSubmit={formik.handleSubmit}
                        //className={classes.formLogin}
                        autoComplete="off"
                    >
                        <Grid container>
                            <Grid item sm={6} xs={12} className={classes.root}>
                                <CssTextField
                                    className={classes.formInput}
                                    fullWidth
                                    id="tenDangNhap"
                                    name="tenDangNhap"
                                    placeholder="Tên Đăng Nhập"
                                    
                                    variant="standard"
                                    value={formik.values.tenDangNhap}
                                    onChange={formik.handleChange}
                                    error={formik.touched.tenDangNhap && Boolean(formik.errors.tenDangNhap)}
                                    helperText={formik.touched.tenDangNhap && formik.errors.tenDangNhap}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountCircleOutlinedIcon style={{ color: "#495057" }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <CssTextField
                                    fullWidth
                                    className={classes.formInput}
                                    id="ten"
                                    name="ten"
                                    placeholder="Tên"
                                    
                                    variant="standard"
                                    value={formik.values.ten}
                                    onChange={formik.handleChange}
                                    error={formik.touched.ten && Boolean(formik.errors.ten)}
                                    helperText={formik.touched.ten && formik.errors.ten}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AdminPanelSettingsOutlinedIcon style={{ color: "#495057" }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <CssTextField
                                    fullWidth
                                    className={classes.formInput}
                                    id="anhDaiDien"
                                    name="anhDaiDien"
                                    placeholder="Ảnh Đại diện"
                                    
                                    variant="standard"
                                    value={formik.values.anhDaiDien}
                                    onChange={formik.handleChange}
                                    error={formik.touched.anhDaiDien && Boolean(formik.errors.anhDaiDien)}
                                    helperText={formik.touched.anhDaiDien && formik.errors.anhDaiDien}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <FaceOutlinedIcon style={{ color: "#495057" }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <CssTextField
                                    fullWidth
                                    className={classes.formInput}
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    
                                    variant="standard"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <ContactMailOutlinedIcon style={{ color: "#495057" }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12} className={classes.root}>
                                <CssTextField
                                    fullWidth
                                    className={classes.formInput}
                                    id="matKhau"
                                    name="matKhau"
                                    placeholder="Mật Khẩu"
                                    
                                    variant="standard"
                                    value={formik.values.matKhau}
                                    onChange={formik.handleChange}
                                    error={formik.touched.matKhau && Boolean(formik.errors.matKhau)}
                                    helperText={formik.touched.matKhau && formik.errors.matKhau}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockOpenIcon style={{ color: "#495057" }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <CssTextField
                                    fullWidth
                                    className={classes.formInput}
                                    id="diaChi"
                                    name="diaChi"
                                    placeholder="Địa chỉ"
                                    
                                    variant="standard"
                                    value={formik.values.diaChi}
                                    onChange={formik.handleChange}
                                    error={formik.touched.diaChi && Boolean(formik.errors.diaChi)}
                                    helperText={formik.touched.diaChi && formik.errors.diaChi}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <BusinessOutlinedIcon style={{ color: "#495057" }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <CssTextField
                                    className={classes.formInput}
                                    fullWidth
                                    id="sdt"
                                    name="sdt"
                                    placeholder="Số điện thoại"
                                    
                                    variant="standard"
                                    value={formik.values.sdt}
                                    onChange={formik.handleChange}
                                    error={formik.touched.sdt && Boolean(formik.errors.sdt)}
                                    helperText={formik.touched.sdt && formik.errors.sdt}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PhoneIphoneOutlinedIcon style={{ color: "#495057" }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Switch
                                    checked={checked}
                                    onChange={handleChangeAdmin}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                                
                            </Grid>
                        </Grid>

                        <div>
                            <Button
                                // variant="contained"
                                // color="primary"
                                onClick={formik.handleSubmit}
                                type="submit"
                            >
                                Cập nhật
                            </Button>
                        </div>

                    </form>
                )}
            </Formik>
        </>
    );
}
