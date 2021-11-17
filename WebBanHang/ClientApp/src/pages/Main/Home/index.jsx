import React, { useState, useEffect} from "react";
import HomeCarousel from "../../../components/Carousel/HomeCarousel";
import { GetAllProductPaging } from "../../../redux/actions/product.action";
import { useDispatch, useSelector } from "react-redux";
import ShopProductCard from "../../../components/Card/ShopProductCard";
import { Grid, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    newProduct: {
        padding: "20px 0",
    },
    newProductTitle: {
        paddingTop: "20px"
    },
    productCard: {
    }
})

const Home = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { listProductsPaging } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(GetAllProductPaging(1, 8));
        //dispatch(GetProductsByCategoryPaging(1, 1, 4));
    }, []);

    console.log(listProductsPaging);

    return (
        <>
            <HomeCarousel />
            
            <Grid container spacing={3} className={classes.newProduct}>
                <Grid item xs={ 12} className={classes.newProductTitle}>
                    <Typography variant="h2" align="center" gutterBottom>Sản phẩm mới</Typography>
                </Grid>
                {listProductsPaging.map((item) => (
                    <Grid item md={3} sm={6} xs={12}
                        className={classes.productCard}
                        key={item.maSp}
                    >
                        <ShopProductCard product={item} />
                    </Grid>
                    
                ))}
            </Grid>
        </>
    );
}

export default Home;