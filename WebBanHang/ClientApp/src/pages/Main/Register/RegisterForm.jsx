import React from "react";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { Grid, TextField, Button, InputAdornment } from "@mui/material";
import { makeStyles, withStyles } from "@mui/styles";
// import { Form } from "../../../components/useForm";
import { Formik } from "formik";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { CustomRegister } from "../../../redux/actions/user.action";
import { useHistory } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 20,
    },
    formRegister: {
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
        marginTop: 15,
        display: "flex !important",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        color: "#5252d4",
    },
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
});


export default function RegisterForm() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();


    return (
        <>
            <Formik
                initialValues={{
                    tenDangNhap: "",
                    matKhau: "",
                    ten: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    dispatch(CustomRegister(values, history))
                }}
            >
                {(formik) => (
                    <form
                        onSubmit={formik.handleSubmit}
                        className={classes.formRegister}
                        autoComplete="off"
                    >
                        <Grid container>
                            <Grid item xs={12} className={classes.root}>
                                <CssTextField
                                    className={classes.formInput}
                                    fullWidth
                                    id="tenDangNhap"
                                    name="tenDangNhap"
                                    placeholder="Tên đăng nhập"
                                    //label="Tên sản phẩm"
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


                            </Grid>
                            <Grid item xs={12} className={classes.root}>
                                <CssTextField
                                    fullWidth
                                    className={classes.formInput}
                                    id="matKhau"
                                    name="matKhau"
                                    placeholder="Mật khẩu"

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

                            </Grid>
                            <Grid item xs={12} className={classes.root}>
                                <CssTextField
                                    fullWidth
                                    className={classes.formInput}
                                    id="ten"
                                    name="ten"
                                    placeholder="Họ Tên"

                                    variant="standard"
                                    value={formik.values.ten}
                                    onChange={formik.handleChange}
                                    error={formik.touched.ten && Boolean(formik.errors.ten)}
                                    helperText={formik.touched.ten && formik.errors.ten}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockOpenIcon style={{ color: "#495057" }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                            </Grid>
                        </Grid>

                        <div className={classes.btn}>
                            <Button
                                // variant="contained"
                                // color="primary"
                                
                                onClick={formik.handleSubmit}
                                type="submit"
                            >
                                Register
                            </Button>
                        </div>

                    </form>
                )}
            </Formik>
        </>
    );
}
