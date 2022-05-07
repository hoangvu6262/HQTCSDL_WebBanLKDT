import React, { useEffect} from "react";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField, Button, InputAdornment, FormControl, Select, MenuItem, InputLabel, FormHelperText } from "@mui/material";
import { makeStyles, withStyles } from "@mui/styles";
// import { Form } from "../../../components/useForm";
import { Formik} from "formik";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { AddProduct } from "../../../redux/actions/product.action"
import { GetListCategory } from "../../../redux/actions/category.action"

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
    maDanhMuc: yup.number().required("Vui lòng chọn danh mục sản phẩm.")
        .test("ma danh muc", "Vui lòng chọn danh mục sản phẩm.", (value) => {
            //console.log(value)
            if (value === 0) {
                return false
            }
            return true
        }),
  tenSp: yup
    .string("Thêm tên sản phẩm")
    .required("Vui lòng thêm tên sản phẩm."),
  hinhAnh: yup
    .string("Thêm hình ảnh cho sản phẩm.")
    .required("Vui lòng phải thêm hình ảnh cho phim."),
  moTa: yup.string().required("Vui lòng thêm mô tả cho sản phẩm."),
  donGia: yup
    .number("Bạn phải nhập số.")
    .typeError("Dữ liệu đầu vào phải là kiểu số.")
    .required("Vui lòng thêm đơn giá cho sản phẩm."),
  soLuongCon: yup
    .number("Bạn phải nhập số.")
    .typeError("Dữ liệu đầu vào phải là kiểu số.")
    .required("Vui lòng nhập số lượng cho sản phẩm."),
  anh1: yup.string("Thêm hình ảnh 1 cho sản phẩm."),
  anh2: yup.string("Thêm hình ảnh 2 cho sản phẩm."),
  anh3: yup.string("Thêm hình ảnh 3 cho sản phẩm."),
});


export default function ProductForm(props) {
  const { openDialog, setOpenDialog } = props;
  const classes = useStyles();
    const dispatch = useDispatch();
    const { listCategory } = useSelector(state => state.category)

    useEffect(() => {
        dispatch(GetListCategory())
    }, [])


  return (
    <>
          <Formik
              initialValues={{
                  maDanhMuc: 0,
                  tenSp: "",
                  hinhAnh: "",
                  moTa: "",
                  donGia: 0,
                  soLuongCon: 0,
                  anh1: "",
                  anh2: "",
                  anh3: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                  console.log(values);
                  dispatch(AddProduct(values, openDialog, setOpenDialog));
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
                                  id="tenSp"
                                  name="tenSp"
                                  placeholder="Tên sản phẩm"
                                  label="Tên sản phẩm"
                                  variant="standard"
                                  value={formik.values.tenSp}
                                  onChange={formik.handleChange}
                                  error={formik.touched.tenSp && Boolean(formik.errors.tenSp)}
                                  helperText={formik.touched.tenSp && formik.errors.tenSp}
                                  InputProps={{
                                      startAdornment: (
                                          <InputAdornment position="start">
                                              <AccountCircle style={{ color: "#495057" }} />
                                          </InputAdornment>
                                      ),
                                  }}
                              />

                              
                              <FormControl sx={{ height: 70, minWidth: "100%", marginTop: "10px" }}>
                                  <InputLabel sx={{ marginLeft: 0 }}>Danh mục sản phẩm</InputLabel>
                                  <Select
                                      id="maDanhMuc"
                                      name="maDanhMuc"
                                      value={formik.values.maDanhMuc}
                                      onChange={(e) => {
                                          formik.setFieldValue("maDanhMuc", e.target.value)

                                      }}
                                      error={formik.touched.maDanhMuc && Boolean(formik.errors.maDanhMuc)}
                                      variant="standard"
                                      displayEmpty
                                      inputProps={{ 'aria-label': 'Without label' }}
                                  >
                                      <MenuItem value={0}>
                                          <em>None</em>
                                      </MenuItem>
                                      {listCategory.map((category) => {
                                          return (
                                              <MenuItem key={category.maDanhMuc} value={category.maDanhMuc}>{category.tenDanhMuc}</MenuItem>
                                          );
                                      })}
                                  </Select>
                                  <FormHelperText error={true}>{ formik.errors.maDanhMuc}</FormHelperText>
                              </FormControl>
                              <CssTextField
                                  fullWidth
                                  className={classes.formInput}
                                  id="soLuongCon"
                                  name="soLuongCon"
                                  placeholder="Số lượng"
                                  label="Số lượng"
                                  variant="standard"
                                  value={formik.values.soLuongCon}
                                  onChange={formik.handleChange}
                                  error={formik.touched.soLuongCon && Boolean(formik.errors.soLuongCon)}
                                  helperText={formik.touched.soLuongCon && formik.errors.soLuongCon}
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
                                  id="moTa"
                                  name="moTa"
                                  placeholder="Mô tả"
                                  label="Mô tả"
                                  variant="standard"
                                  value={formik.values.moTa}
                                  onChange={formik.handleChange}
                                  error={formik.touched.moTa && Boolean(formik.errors.moTa)}
                                  helperText={formik.touched.moTa && formik.errors.moTa}
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
                                  id="donGia"
                                  name="donGia"
                                  placeholder="Giá"
                                  label="Giá"
                                  variant="standard"
                                  value={formik.values.donGia}
                                  onChange={formik.handleChange}
                                  error={formik.touched.donGia && Boolean(formik.errors.donGia)}
                                  helperText={formik.touched.donGia && formik.errors.donGia}
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
                                  placeholder="Hình ảnh sản phẩm"
                                  label="Hình ảnh sản phẩm"
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
                              <CssTextField
                                  className={classes.formInput}
                                  fullWidth
                                  id="anh1"
                                  name="anh1"
                                  placeholder="Ảnh số 1"
                                  label="Ảnh số 1"
                                  variant="standard"
                                  value={formik.values.anh1}
                                  onChange={formik.handleChange}
                                  error={formik.touched.anh1 && Boolean(formik.errors.anh1)}
                                  helperText={formik.touched.anh1 && formik.errors.anh1}
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
                                  id="anh2"
                                  name="anh2"
                                  placeholder="Ảnh số 2"
                                  label="Ảnh số 2"
                                  variant="standard"
                                  value={formik.values.anh2}
                                  onChange={formik.handleChange}
                                  error={formik.touched.anh2 && Boolean(formik.errors.anh2)}
                                  helperText={formik.touched.anh2 && formik.errors.anh2}
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
                                  id="anh3"
                                  name="anh3"
                                  placeholder="Ảnh số 3"
                                  label="Ảnh số 3"
                                  variant="standard"
                                  value={formik.values.anh3}
                                  onChange={formik.handleChange}
                                  error={formik.touched.anh3 && Boolean(formik.errors.anh3)}
                                  helperText={formik.touched.anh3 && formik.errors.anh3}
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
                              Thêm sản phẩm
                            </Button>
                      </div>

                  </form>
              )}
          </Formik>
    </>
  );
}
