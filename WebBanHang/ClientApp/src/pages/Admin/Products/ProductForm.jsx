import React from "react";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Grid, FormHelperText } from "@mui/material";
import { makeStyles } from "@mui/styles";
// import { Form } from "../../../components/useForm";
import { Formik, Form } from "formik";
import Controls from "../../../components/controls/Controls";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 25,
    "& .MuiFormControl-root": {
      width: "100%",
      margin: 10,
    },
  },
}));

const validationForm = yup.object({
  MaDanhMuc: yup.number().required("Vui lòng chọn danh mục sản phẩm."),
  TenSP: yup
    .string("Thêm tên sản phẩm")
    .required("Vui lòng thêm tên sản phẩm."),
  HinhAnh: yup
    .string("Thêm hình ảnh cho phim.")
    .required("Vui lòng phải thêm hình ảnh cho phim."),
  MoTa: yup.string().required("Vui lòng thêm mô tả cho sản phẩm."),
  DonGia: yup
    .number("Bạn phải nhập số.")
    .typeError("Dữ liệu đầu vào phải là kiểu số.")
    .required("Vui lòng thêm đơn giá cho sản phẩm."),
  SoLuongCon: yup
    .number("Bạn phải nhập số.")
    .typeError("Dữ liệu đầu vào phải là kiểu số.")
    .required("Vui lòng nhập số lượng cho sản phẩm."),
  Anh1: yup.string("Thêm hình ảnh 1 cho sản phẩm."),
  Anh2: yup.string("Thêm hình ảnh 2 cho sản phẩm."),
  Anh3: yup.string("Thêm hình ảnh 3 cho sản phẩm."),
});

const options = [
  { value: 1, label: "Bàn phím" },
  { value: 2, label: "Chuột" },
  { value: 3, label: "Màn hình" },
];

export default function ProductForm(props) {
  const { openDialog, setOpenDialog } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const { Input, MuiSelect, Button } = Controls;

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          MaDanhMuc: 0,
          TenSP: "",
          HinhAnh: "",
          MoTa: "",
          DonGia: 0,
          SoLuongCon: 0,
          Anh1: "",
          Anh2: "",
          Anh3: "",
        }}
        validationSchema={validationForm}
        onSubmit={(values) => {
          alert(JSON.stringify(values));
          // console.log(values);
        }}
      >
        {(formik) => (
          <form
            onSubmit={formik.handleSubmit}
            className={classes.root}
            autoComplete="off"
          >
            <Grid container spacing={3}>
              <Grid item lg={6} xs={12}>
                <Input
                  id="TenSP"
                  name="TenSP"
                  label="Tên SP"
                  value={formik.values.TenSP}
                  onChange={formik.handleChange}
                  error={formik.touched.TenSP && Boolean(formik.errors.TenSP)}
                  helperText={formik.touched.TenSP && formik.errors.TenSP}
                />
                {/* <Controls.Input
                  id="trailer"
                  name="trailer"
                  label="Trailer"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.trailer}
                  error={
                    formik.touched.trailer && Boolean(formik.errors.trailer)
                  }
                  helperText={formik.touched.trailer && formik.errors.trailer}
                /> */}
                <MuiSelect
                  id="MaDanhMuc"
                  name="MaDanhMuc"
                  label="Mã DM"
                  options={options}
                  value={formik.values.MaDanhMuc}
                  onChange={formik.handleChange}
                />
                {/* <Controls.Input
                  id="hinhAnh"
                  name="hinhAnh"
                  label="Hình Ảnh"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.hinhAnh}
                  error={
                    formik.touched.hinhAnh && Boolean(formik.errors.hinhAnh)
                  }
                  helperText={formik.touched.hinhAnh && formik.errors.hinhAnh}
                /> */}
              </Grid>
              {/* <Grid item lg={6} xs={12}>
                <Controls.Input
                  id="danhGia"
                  name="danhGia"
                  label="Đánh giá"
                  onChange={formik.handleChange}
                  value={formik.values.danhGia}
                  error={
                    formik.touched.danhGia && Boolean(formik.errors.danhGia)
                  }
                  helperText={formik.touched.danhGia && formik.errors.danhGia}
                />
                <Controls.TextArea
                  id="moTa"
                  name="moTa"
                  label="Mô tả"
                  multiline
                  rows={11}
                  onChange={formik.handleChange}
                  value={formik.values.moTa}
                  error={formik.touched.moTa && Boolean(formik.errors.moTa)}
                  helperText={formik.touched.moTa && formik.errors.moTa}
                />
              </Grid> */}
            </Grid>
            <Button
              color="primary"
              variant="outlined"
              text="Submit"
              onSubmit={formik.handleSubmit}
              type="submit"
            />
          </form>
        )}
      </Formik>
    </>
  );
}
