import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { CustomorLogin, AdminLogin } from "../../redux/actions/user.action";
import {
    TextField,
    InputAdornment,
    Button,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Formik } from "formik";
import * as yup from "yup";
import { makeStyles, withStyles } from "@mui/styles";

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

const useStyles = makeStyles({
    formLogin: {
        // margin: "30px 18px",
        padding: "30px 18px",
        color: "#495057",
    },
    formInput: {
        margin: "20px 0",
        color: "#495057",
        width: "100%",
    },
    btn: {
        marginTop : 15,
        display: "flex !important",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        color: "#5252d4",
    },
});

export default function LoginForm(props) {
    const { isAdmin } = props;
    const classes = useStyles();
    const dispatch = useDispatch();
    const [pass, setPass] = useState(true);

    // click sẽ thay đổi pass thành false, hiện thị mật khẩu
    const handleChangePassOrText = () => {
        setPass(!pass);
    };
    
    return (
        <div>
            <Formik
                initialValues={{ tenDangNhap: "", matKhau: "" }}
                validationSchema={yup.object({
                    tenDangNhap: yup
                        .string("Enter your username")
                        .required("Email is required"),
                    matKhau: yup
                        .string("Enter your password")
                        .required("Password is required"),
                })}
                onSubmit={(values) => {
                    if (isAdmin) {
                        dispatch(AdminLogin(values));
                    } else {
                        dispatch(CustomorLogin(values));
                    }
                    
                }}
            >
                {(formik) => (
                    <form
                        onSubmit={formik.handleSubmit}
                        className={classes.formLogin}
                        autoComplete="off"
                    >
                        <CssTextField
                            className={classes.formInput}
                            id="tenDangNhap"
                            name="tenDangNhap"
                            placeholder="ACCOUNT..."
                            variant="standard"
                            value={formik.values.tenDangNhap}
                            onChange={formik.handleChange}
                            error={formik.touched.tenDangNhap && Boolean(formik.errors.tenDangNhap)}
                            helperText={formik.touched.tenDangNhap && formik.errors.tenDangNhap}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle style={{ color: "#495057" }} />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <CssTextField
                            className={classes.formInput}
                            id="matKhau"
                            name="matKhau"
                            type={pass ? "password" : "text"}
                            placeholder="PASSWORD..."
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
                                endAdornment: (
                                    <InputAdornment
                                        position="end"
                                        onClick={handleChangePassOrText}
                                        style={{ cursor: "pointer" }}
                                    >
                                        {pass ? (
                                            <VisibilityOffIcon style={{ color: "#495057" }} />
                                        ) : (
                                            <VisibilityIcon style={{ color: "#495057" }} />
                                        )}
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <div className={classes.btn}>
                            <Button
                                // variant="contained"
                                // color="primary"
                                onClick={formik.handleSubmit}
                                type="submit"
                            >
                                Đăng nhập
                            </Button>
                        </div>
                        
                    </form>
                )}
            </Formik>
        </div>
    );
}
