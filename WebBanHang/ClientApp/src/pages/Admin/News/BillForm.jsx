import React from "react";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { Grid, TextField, Button, InputAdornment } from "@mui/material";
import { makeStyles, withStyles } from "@mui/styles";
// import { Form } from "../../../components/useForm";
import { Formik } from "formik";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { AddNews } from "../../../redux/actions/news.action"

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
    tieuDe: yup
        .string("Thêm tiêu đề cho tin tức")
        .required("Vui lòng thêm tiêu đề cho tin tức."),
    noiDung: yup
        .string("Thêm nội dung cho tin tức")
        .required("Vui lòng thêm nội dung cho tin tức."),
    hinhAnh: yup
        .string("Thêm hình ảnh cho tin tức.")
        .required("Vui lòng phải thêm hình ảnh cho tin tức."),
    tacGia: yup.string("Thêm tác giả cho tin tức").required("Vui lòng thêm tác giả."),
});


export default function BillForm(props) {
    const { openDialog, setOpenDialog } = props;
    const classes = useStyles();
    const dispatch = useDispatch();


    return (
        <>
            <Formik
                initialValues={{
                    tieuDe: "",
                    noiDung: "",
                    hinhAnh: "",
                    tacGia: "",
                    
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log(values);
                    dispatch(AddNews(values, openDialog, setOpenDialog));
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
                                    id="tieuDe"
                                    name="tieuDe"
                                    placeholder="Tiêu Đề"
                                    variant="standard"
                                    value={formik.values.tieuDe}
                                    onChange={formik.handleChange}
                                    error={formik.touched.tieuDe && Boolean(formik.errors.tieuDe)}
                                    helperText={formik.touched.tieuDe && formik.errors.tieuDe}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountCircle style={{ color: "#495057" }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <CssTextField
                                    fullWidth
                                    className={classes.formInput}
                                    id="tacGia"
                                    name="tacGia"
                                    placeholder="Tác giả"
                                    
                                    variant="standard"
                                    value={formik.values.tacGia}
                                    onChange={formik.handleChange}
                                    error={formik.touched.tacGia && Boolean(formik.errors.tacGia)}
                                    helperText={formik.touched.tacGia && formik.errors.tacGia}
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
                                    id="hinhAnh"
                                    name="hinhAnh"
                                    placeholder="Hình ảnh"
                                    l
                                    variant="standard"
                                    value={formik.values.hinhAnh}
                                    onChange={formik.handleChange}
                                    error={formik.touched.hinhAnh && Boolean(formik.errors.hinhAnh)}
                                    helperText={formik.touched.hinhAnh && formik.errors.hinhAnh}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockOpenIcon style={{ color: "#495057" }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                
                                
                            </Grid>
                            <Grid item sm={6} xs={12} className={classes.root}>
                                <CssTextField
                                    fullWidth
                                    className={classes.formInput}
                                    id="noiDung"
                                    name="noiDung"
                                    placeholder="Nội dung"
                                    multiline
                                    rows={8}
                                    variant="standard"
                                    value={formik.values.maDanhMuc}
                                    onChange={formik.handleChange}
                                    error={formik.touched.noiDung && Boolean(formik.errors.noiDung)}
                                    helperText={formik.touched.noiDung && formik.errors.noiDung}
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
                                Thêm tin tức
                            </Button>
                        </div>

                    </form>
                )}
            </Formik>
        </>
    );
}
