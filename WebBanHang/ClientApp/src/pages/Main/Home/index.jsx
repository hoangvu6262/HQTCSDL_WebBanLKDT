import React, { useState, useEffect} from "react";
import HomeCarousel from "../../../components/Carousel/HomeCarousel";
import { GetAllProductPaging } from "../../../redux/actions/product.action";
import { useDispatch, useSelector } from "react-redux";
import ShopProductCard from "../../../components/Card/ShopProductCard";
import { Grid, Typography, Container, Paper, Button } from "@mui/material"
import { makeStyles } from "@mui/styles";
import { ADD_TO_CART_SUCCESS } from "../../../redux/constants/product.constant";
import action from "../../../redux/actions/action";
import { GetListCategory } from "../../../redux/actions/category.action";
import {Link} from "react-router-dom"

const useStyles = makeStyles({
    newProduct: {
        padding: "20px 0 !important",
    },
    newProductTitle: {
        margin: "20px 0 !important",
        padding: "15px 0 !important",
        //backgroundColor: "green",
        "& h2": {
            fontFamily: "'Urbanist', sans- serif",
            fontWeight: "600 !important"
        },

    },
    productCard: {
        padding: "15px",
    },
    category: {
        padding: 100,
        backgroundImage: "url('https://mui.com/static/themes/onepirate/productCurvyLines.png')",
        backgroundColor: "#fff5f8"
    },
    categoryCard: {
        padding: "15px",
        
    },
    categoryPaper: {
        textAlign: "center",
        fontFamily: "'Urbanist', sans- serif",
        fontWeight: "600 !important",
        textTransform: "uppercase",
        borderRadius: "0 !important",
        "& p": {
            "&:hover": {
                textDecoration: "none !important",
                color: "#000"
            }
        },
        "&:hover": {
            textDecoration: "none !important",
            color: "#000"
        }
    },
    viewAll: {
        paddingRight: 15,
        display: "flex",
        justifyContent: "flex-end"
    },
    viewAllButton: {
        border: "2px solid #000 !important",
        fontSize: "15px !important",
        color: "#000 !important",
        padding: "10px 15px !important",
        fontFamily: "'Urbanist', sans- serif !important",
        borderRadius: "0 !important",
    },
})

const Home = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { listProductsPaging, cart } = useSelector((state) => state.product);
    const { listCategory } = useSelector(state => state.category);

    console.log(cart);

    useEffect(() => {
        dispatch(GetListCategory())
        dispatch(GetAllProductPaging(1, 8));
    }, []);

    const handleAddToCart = (product) => {
        dispatch(action(ADD_TO_CART_SUCCESS, product));
    }

    

    return (
        <>
            <div className={classes.category}>
                <Container maxWidth="lg">
                    <div className={classes.newProductTitle}>
                        <Typography variant="h2" align="center" gutterBottom >Categories</Typography>
                    </div>
                    <Grid container className={classes.newProduct}>
                        {listCategory.map((item) => (
                            <Grid item md={3} sm={6} xs={12}
                                className={classes.categoryCard}
                                key={item.maDanhMuc}
                            >
                                <Paper component={Link} to={`/list-products&categoryid=${item.maDanhMuc}`} className={classes.categoryPaper}>
                                    <p>{item.tenDanhMuc}</p>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </div>
            <Container maxWidth="lg">
                <div className={classes.newProductTitle}>
                    <Typography variant="h2" align="center" gutterBottom >New Products</Typography>
                </div>
                <Grid container className={classes.newProduct}>
                    <Grid item xs={12} className={ classes.viewAll}>
                        <Button component={Link} to="/listproducts" className={classes.viewAllButton}>View all</Button>
                    </Grid>
                    {listProductsPaging.map((item) => (
                        <Grid item md={3} sm={6} xs={12}
                            className={classes.productCard}
                            key={item.maSp}
                        >
                            <ShopProductCard product={item} onClickAddToCard={handleAddToCart}/>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
}

export default Home;