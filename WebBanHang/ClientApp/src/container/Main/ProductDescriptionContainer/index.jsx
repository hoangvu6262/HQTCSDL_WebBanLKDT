import React from "react";
import ShopProductCard from "../../../components/Card/ShopProductCard";
import { Grid, Box, AppBar } from '@mui/material';
import { makeStyles } from "@mui/styles";
import { ADD_TO_CART_SUCCESS } from "../../../redux/constants/product.constant";
import { useDispatch } from "react-redux";
import action from "../../../redux/actions/action";

const useStyles = makeStyles({
    productDetailDescription: {
        marginTop: 15,
        borderRadius: "0px !important",
        "& p": {
            padding: "20px",
            marginBottom: 0,
            fontSize: 15,
            fontWeight: 400,
            color: "rgb(33, 43, 54)",
            //fontFamily: "'Urbanist', sans- serif !important",
        },
    },
    appbar: {
        padding: "10px 20px",
        backgroundColor: "rgb(244 246 248) !important",
        color: "rgb(33, 43, 54) !important",
        fontWeight: 600,
        //fontFamily: "'Urbanist', sans- serif !important",
        boxShadow: "none !important",
    },

    relatedProducts: {
        padding: 15,
    }
})

const ProductDescriptionContainer = ({ productDetail, listRelatedProducts }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleAddToCartRelated = (product) => {
        dispatch(action(ADD_TO_CART_SUCCESS, product));
    }

    return (
        <>
            <Box className={classes.productDetailDescription}>
                <AppBar position="static" className={classes.appbar}>
                    Mô tả sản phẩm
                    </AppBar>
                <p>{productDetail.moTa}</p>
            </Box>
            <Box className={classes.productDetailDiscription}>
                <AppBar position="static" className={classes.appbar}>
                    Sản phẩm liên quan
                    </AppBar>
                <div className={classes.relatedProducts}>
                    <Grid container spacing={2}>
                        {listRelatedProducts.map((product) => {
                            return (<Grid item md={3} xs={6} key={product.maSp}>
                                <ShopProductCard product={product} onClickAddToCard={handleAddToCartRelated} />
                            </Grid>)

                        })}
                    </Grid>
                </div>
            </Box>
        </>
        )
}

export default ProductDescriptionContainer;