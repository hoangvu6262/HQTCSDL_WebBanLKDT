import React from "react";
import ShopProductCard from "../../../components/Card/ShopProductCard";
import { ADD_TO_CART_SUCCESS } from "../../../redux/constants/product.constant";
import action from "../../../redux/actions/action";
import { Grid, Typography, Container, Button } from "@mui/material"
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const useStyles = makeStyles({
    newProduct: {
        padding: "20px 5px !important",
    },
    newProductTitle: {
        textTransform: "uppercase",
        padding: "0 !important",
        fontSize: "22px !important",
        color: "#fff !important"

    },
    productCard: {
        padding: "2px 2px 40px 2px",
    },
    viewAll: {
        backgroundColor: "#d7202c",
        //margin: "0px 15px",
        padding: "5px 20px",
        display: "flex",
        justifyContent: "space-between",
    },
    viewAllButton: {
        fontSize: "15px !important",
        color: "#fff !important",
        padding: "0px 15px !important",
        //fontFamily: "'Urbanist', sans- serif !important",
        borderRadius: "0 !important",
    },
    productContainer: {
        marginBottom: 5,
        padding: 5,
        "&.MuiContainer-maxWidthXl": {
            maxWidth: 1310,
        }
    },
    arrowIcon: {
        fontSize: "16px !important",
    }
})

const ProductContainer = ({ listProductsPaging, tittle}) => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(action(ADD_TO_CART_SUCCESS, product));
    }

    return (
        <>
            <Container maxWidth="xl" className={classes.productContainer}>
                <Grid container className={classes.newProduct}>
                    <Grid item xs={12} className={classes.viewAll}>
                        <Typography variant="h6" component="h6" align="center" className={classes.newProductTitle}>{tittle} - Miễn phí giao hàng</Typography>
                        <Button component={Link} to="/listproducts" className={classes.viewAllButton} endIcon={<ArrowForwardIosIcon className={ classes.arrowIcon}/>}>Xem tất cả</Button>
                    </Grid>
                    {listProductsPaging.map((item) => (
                        <Grid item md={2} sm={4} xs={6}
                            className={classes.productCard}
                            key={item.maSp}
                        >
                            <ShopProductCard product={item} onClickAddToCard={handleAddToCart} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
        )
}

export default ProductContainer;