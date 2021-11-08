import React, { useState } from "react";
import AdminHeader from "../../../components/AdminHeader";
import { Paper, Autocomplete, TextField, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Search from "../../../components/Search";
import ProductsTable from "./ProductsTable";
import FormDialog from "../../../components/Dialog";
import ProductForm from "./ProductForm";

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

const options = ["Bàn phím", "Chuột", "Màn hình"];

export default function Products() {
  const classes = useStyles();

  const [openDialog, setOpenDialog] = useState({
    open: false,
    isAddProduct: false,
    title: "",
  });

  const handleOnlick = () => {
    setOpenDialog({
      open: true,
      isAddMovie: true,
      title: "Thêm sản phẩm",
    });
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} className={classes.root}>
          <AdminHeader title="Quản lý sản phẩm" handleOnlick={handleOnlick} />
          <Paper className={classes.searchPaper}>
            <Search
              id="search"
              name="search"
              placeholder="Search Product by Name..."
              // onChange={handleSearchProducts}
            />
          </Paper>
          <Paper className={classes.autocompletePaper}>
            <Autocomplete
              // value={value}
              // onChange={(event, newValue) => {
              //   setValue(newValue);
              // }}
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
            />
          </Paper>
          <Paper className={classes.tablePaper}>
            <ProductsTable />
          </Paper>
        </Grid>
      </Grid>

      <FormDialog openDialog={openDialog} setOpenDialog={setOpenDialog}>
        <ProductForm openDialog={openDialog} setOpenDialog={setOpenDialog} />
      </FormDialog>
    </>
  );
}
