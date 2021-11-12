import React, { useState, useEffect } from "react";
import AdminHeader from "../../../components/AdminHeader";
import { Paper, Autocomplete, TextField, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Search from "../../../components/Search";
import ProductsTable from "./ProductsTable";
import FormDialog from "../../../components/Dialog";
import ProductForm from "./ProductForm";
import { SearchProductsByName, GetAllProductPaging, GetProductByCategory } from "../../../redux/actions/product.action";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../../components/Notification"

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

const options = ["Bàn phím", "Chuột", "Màn hình", "Tai nghe"];

export default function Products() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { notification } = useSelector((state) => state.product);

    const [openDialog, setOpenDialog] = useState({
        open: false,
        isAddProduct: false,
        title: "",
    });

    const [value, setValue] = React.useState("All");
    
    useEffect(() => {
        if (value === "Bàn phím") {
            dispatch(GetProductByCategory(2))
        } else if (value === "Tai nghe") {
            dispatch(GetProductByCategory(3))
        } else if (value === "Màn hình") {
            dispatch(GetProductByCategory(1))
        } else if (value === "Chuột") {
            dispatch(GetProductByCategory(4))
        } else {
            dispatch(GetAllProductPaging(1, 5))
        }
    }, [value])


    const handleSearchProducts = (e) => {
        console.log(e.target.value);

        if (e.target.value !== "") {
            dispatch(SearchProductsByName(e.target.value))
        } else {
            dispatch(GetAllProductPaging(1,5))
        }
    }

  const handleOnlick = () => {
    setOpenDialog({
      open: true,
      isAddMovie: true,
        title: "Thêm sản phẩm",
    });
    };

    // close notification
    const handleCloseNotification = () => {
        dispatch({
            type: "CLOSE_NOTIFICATION",
            payload: false,
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
              onChange={handleSearchProducts}
            />
          </Paper>
          <Paper className={classes.autocompletePaper}>
            <Autocomplete
              value={value}
              onChange={(event, newValue) => {
                 setValue(newValue);
              }}
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
              <ProductsTable/>
          </Paper>
        </Grid>
      </Grid>

      <Notification notifyAlert={notification} onClose={handleCloseNotification} />

      <FormDialog openDialog={openDialog} setOpenDialog={setOpenDialog}>
        <ProductForm openDialog={openDialog} setOpenDialog={setOpenDialog} />
      </FormDialog>
    </>
  );
}
