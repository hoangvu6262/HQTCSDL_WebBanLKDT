import React, { useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { Grid, TextField, Button, InputAdornment, FormControl, Select, MenuItem, FormHelperText } from "@mui/material";
import { makeStyles, withStyles } from "@mui/styles";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Formik } from "formik";
import * as yup from "yup";
// import { Form } from "../../../components/useForm";
import { PutConfirmReceived, PutConfirmCanceled, PutAdConfirm, AddBill } from "../../../redux/actions/bill.action";



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
    maKhachHang: yup.number().required("Vui lòng thêm mã khách hàng."),
    tongTien: yup
        .number("Thêm tổng tiền")
        .required("Vui lòng thêm tổng tiền."),
});


export default function BillForm(props) {
    const { openDialog, setOpenDialog } = props;
    const classes = useStyles();
    const dispatch = useDispatch();

    const [status, setStatus] = useState(0);

    const [iValue, setIValue] = useState({
        maKhachHang:  0,
        tongTien:  0,
    });

    useEffect(() => {
        setIValue({
            ...iValue,
            maKhachHang: openDialog.maKhachHang ?? 0,
            tongTien: openDialog.tongTien ?? 0,
        });
    }, [openDialog]);

    useEffect(() => {
        setStatus(openDialog.status);
    }, [openDialog]);


    const handleChangeStatus = (e) => {
        setStatus(e.target.value);
        if (e.target.value === 2) {
            dispatch(PutAdConfirm(openDialog.id))
        } else if (e.target.value === 3) {
            dispatch(PutConfirmReceived(openDialog.id))
        } else if (e.target.value === 4) {
            dispatch(PutConfirmCanceled(openDialog.id))
        } 
    }

    return (
        <>
            <Formik
                initialValues={iValue}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    if (openDialog.isAddBill) {
                        dispatch(AddBill(values, openDialog, setOpenDialog));
                    } else {
                        setOpenDialog({ ...openDialog, open: false })
                    }
                    
                }}
            >
                {(formik) => (
                    <form
                        //enablereinitialize
                        onSubmit={formik.handleSubmit}
                        //className={classes.formLogin}
                        autoComplete="off"
                    >
                        <Grid container>
                            <Grid item sm={6} xs={12} className={classes.root}>
                                <CssTextField
                                    className={classes.formInput}
                                    fullWidth
                                    id="maKhachHang"
                                    name="maKhachHang"
                                    placeholder="Mã Khách hàng"
                                    label="Mã Khách hàng"
                                    variant="standard"
                                    disabled={!openDialog.isAddBill}
                                    value={formik.values.maKhachHang}
                                    onChange={formik.handleChange}
                                    error={formik.touched.maKhachHang && Boolean(formik.errors.maKhachHang)}
                                    helperText={formik.touched.maKhachHang && formik.errors.maKhachHang}
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
                                    id="tongTien"
                                    name="tongTien"
                                    placeholder="Tổng Tiền"
                                    label="Tổng Tiền"
                                    variant="standard"
                                    disabled={!openDialog.isAddBill}
                                    value={formik.values.tongTien}
                                    onChange={formik.handleChange}
                                    error={formik.touched.tongTien && Boolean(formik.errors.tongTien)}
                                    helperText={formik.touched.tongTien && formik.errors.tongTien}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockOpenIcon style={{ color: "#495057" }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                               
                            </Grid>
                            {openDialog.isAddBill ? null : (
                                <Grid item sm={6} xs={12} className={classes.root}>
                                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                                        <Select
                                            value={status}
                                            onChange={handleChangeStatus}
                                            variant="standard"
                                            //displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }}
                                        >
                                            <MenuItem value={ 1}>
                                                <em>Chờ duyệt</em>
                                            </MenuItem>
                                            <MenuItem value={2}>Đã duyệt</MenuItem>
                                            <MenuItem value={3}>Đã nhận</MenuItem>
                                            <MenuItem value={4}>Đã hủy</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            )}
                            
                        </Grid>

                        <div>
                            <Button
                                // variant="contained"
                                // color="primary"
                                onClick={formik.handleSubmit}
                                type="submit"
                            >
                                Submit
                            </Button>
                        </div>

                    </form>
                )}
            </Formik>
        </>
    );
}
