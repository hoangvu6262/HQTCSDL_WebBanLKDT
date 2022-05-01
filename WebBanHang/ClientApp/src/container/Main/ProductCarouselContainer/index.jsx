import React from "react";
import ShopProductCard from "../../../components/Card/ShopProductCard";
import { ADD_TO_CART_SUCCESS } from "../../../redux/constants/product.constant";
import action from "../../../redux/actions/action";
import { Grid, Typography, Container, Button } from "@mui/material"
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


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
        padding: "8px 20px",
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

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1224 },
        items: 5,
        slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1224, min: 464 },
        items: 4,
        slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 3,
        slidesToSlide: 1 // optional, default to 1.
    }
};

const ProductCarouselContainer = ({ listProductsPaging, tittle ="PC GEARVN" }) => {
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
                        <Button component={Link} to="/listproducts" className={classes.viewAllButton} endIcon={<ArrowForwardIosIcon className={classes.arrowIcon} />}>Xem tất cả</Button>
                    </Grid>
                    <Grid item xs={12} >
                            <Carousel
                                swipeable={true}
                                draggable={false}
                                showDots={true}
                                responsive={responsive}
                                ssr={true} // means to render carousel on server-side.
                                infinite={true}
                                autoPlaySpeed={10000}
                                keyBoardControl={true}
                                customTransition="all 1.5"
                                transitionDuration={1000}
                                containerClass="carousel-container"
                                removeArrowOnDeviceType={["desktop","tablet", "mobile"]}
                                dotListClass="custom-dot-list-style"
                                itemClass="carousel-item-padding-40-px"
                            >
                            
                                    {listProductsPaging.map((item) => (
                                        <div
                                            className={classes.productCard}
                                            key={item.maSp}
                                        >
                                            <ShopProductCard product={item} onClickAddToCard={handleAddToCart} />
                                        </div>
                                    ))}
                            
                            </Carousel>
                    </Grid>
                    
                    
                </Grid>
            </Container>
        </>
    )
}

export default ProductCarouselContainer;