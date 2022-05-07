import React, { useState, useEffect } from "react";
import AdminHeader from "../../../components/AdminHeader";
import { Paper, Grid, Button, FormControl, Select, MenuItem } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Search from "../../../components/Search";
import ProductsTable from "./ProductsTable";
import FormDialog from "../../../components/Dialog";
import ProductForm from "./ProductForm";
import CategoryForm from"./CategoryForm"
import { SearchProductsByName, GetAllProductPaging, GetProductByCategory } from "../../../redux/actions/product.action";
import { GetListCategory } from "../../../redux/actions/category.action"
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
    addCategory: {
        display: "flex",
        justifyContent: "flex-end"
    }
});


export default function Products() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { notification } = useSelector((state) => state.product);
    const { notificationCategory, listCategory } = useSelector(state => state.category)

    useEffect(() => {
        dispatch(GetListCategory())
    }, [])


    const [openDialog, setOpenDialog] = useState({
        open: false,
        isAddProduct: false,
        title: "",
    });

    const [openDialogAddCate, setOpenDialogAddCate] = useState({
        open: false,
        title: "",
    });

    const [value, setValue] = React.useState(0);


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

    const handleAddCategory = () => {
        setOpenDialogAddCate({
            open: true,
            title: "Thêm danh mục sản phẩm",
        })
    }

  return (
    <>
      <Grid container>
        <Grid item xs={12} className={classes.root}>
          <AdminHeader title="Quản lý sản phẩm" handleOnlick={handleOnlick} />
                  <Paper className={classes.searchPaper}>
                      <Grid container>
                          <Grid item md={10} xs={ 8}>
                              <Search
                                  id="search"
                                  name="search"
                                  placeholder="Search Product by Name..."
                                  onChange={handleSearchProducts}
                              />
                          </Grid>
                          <Grid item md={2} xs={4} className={ classes.addCategory}>
                              <Button variant="outlined" color="info" onClick={ handleAddCategory}>Add Category</Button>
                          </Grid>
                      </Grid>
            
          </Paper>
          <Paper className={classes.autocompletePaper}>
                      <FormControl sx={{ m: 1, minWidth: 120 }}>
                          <Select
                              value={value}
                              onChange={(e) => {
                                  setValue(e.target.value);
                                  if (e.target.value === 0) {
                                      dispatch(GetAllProductPaging(1, 5))
                                  } else {
                                      dispatch(GetProductByCategory(e.target.value))
                                  }

                              }}
                              variant="standard"
                              displayEmpty
                              inputProps={{ 'aria-label': 'Without label' }}
                          >
                              <MenuItem value={0}>
                                  <em>All</em>
                              </MenuItem>
                              {listCategory.map((category) => {
                                  return (
                                      <MenuItem key={category.maDanhMuc} value={category.maDanhMuc}>{category.tenDanhMuc}</MenuItem>
                                  );
                              })}
                          </Select>
                      </FormControl>
          </Paper>
          <Paper className={classes.tablePaper}>
              <ProductsTable/>
          </Paper>
        </Grid>
      </Grid>

          <Notification notifyAlert={notification} onClose={handleCloseNotification} />
          <Notification notifyAlert={notificationCategory} onClose={handleCloseNotification} />

      <FormDialog openDialog={openDialog} setOpenDialog={setOpenDialog}>
        <ProductForm openDialog={openDialog} setOpenDialog={setOpenDialog} />
      </FormDialog>
          <FormDialog openDialog={openDialogAddCate} setOpenDialog={setOpenDialogAddCate}>
              <CategoryForm openDialog={openDialogAddCate} setOpenDialog={setOpenDialogAddCate} />
          </FormDialog>
    </>
  );
}
