import React from "react";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { Grid, TextField, Button, InputAdornment } from "@mui/material";
import { makeStyles, withStyles } from "@mui/styles";
// import { Form } from "../../../components/useForm";
import { Formik } from "formik";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { AddCategory } from "../../../redux/actions/category.action"

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
    tenDanhMuc: yup.string("thêm tên danh mục sản phẩm.").required("Vui lòng thêm tên danh mục sản phẩm."),
});


export default function CategoryForm(props) {
    const { openDialog, setOpenDialog } = props;
    const classes = useStyles();
    const dispatch = useDispatch();


    return (
        <>
            <Formik
                initialValues={{
                    tenDanhMuc: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    dispatch(AddCategory(values, openDialog, setOpenDialog));
                }}
            >
                {(formik) => (
                    <form
                        onSubmit={formik.handleSubmit}
                        //className={classes.formLogin}
                        autoComplete="off"
                    >
                        <Grid container>
                            <Grid item xs={12} className={classes.root}>
                                <CssTextField
                                    className={classes.formInput}
                                    fullWidth
                                    id="tenDanhMuc"
                                    name="tenDanhMuc"
                                    placeholder="Tên danh mục"
                                    label="Tên danh muc"
                                    variant="standard"
                                    value={formik.values.tenDanhMuc}
                                    onChange={formik.handleChange}
                                    error={formik.touched.tenDanhMuc && Boolean(formik.errors.tenDanhMuc)}
                                    helperText={formik.touched.tenDanhMuc && formik.errors.tenDanhMuc}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountCircle style={{ color: "#495057" }} />
                                            </InputAdornment>
                                        ),
                                    }}
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
                                Thêm danh mục sản phẩm
                            </Button>
                        </div>

                    </form>
                )}
            </Formik>
        </>
    );
}
