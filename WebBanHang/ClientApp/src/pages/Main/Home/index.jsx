import React, { useState, useEffect} from "react";
import HomeCarousel from "../../../components/Carousel/HomeCarousel";
import PosterCard from "../../../components/PosterCard";
import { GetAllProductPaging } from "../../../redux/actions/product.action";
import { GetNewsList } from "../../../redux/actions/news.action"
import { useDispatch, useSelector } from "react-redux";
import ShopProductCard from "../../../components/Card/ShopProductCard";
import { Grid, Typography, Container, Paper, Button } from "@mui/material"
import { makeStyles } from "@mui/styles";
import { ADD_TO_CART_SUCCESS } from "../../../redux/constants/product.constant";
import action from "../../../redux/actions/action";
import { GetListCategory } from "../../../redux/actions/category.action";
import { Link } from "react-router-dom";
import NewsCard from "../../../components/Card/NewsCard";
import CategoryDrawer from "../CategoryDrawer/CategoryDrawer";
import posterList from "./posterList.js";
import TopMegaMenu from "../../../components/TopMegamenu"


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
        padding: "2px",
    },
    megeMenuContainer: {
        paddingBottom: 7,
        //backgroundImage: "url('https://mui.com/static/themes/onepirate/productCurvyLines.png')",
        backgroundColor: "#f1f0f1"
    },
    viewAll: {
        backgroundColor: "#d7202c",
        margin: "0px 15px",
        padding: "0px 20px",
        display: "flex",
        justifyContent: "space-between",
    },
    viewAllButton: {
        fontSize: "15px !important",
        color: "#fff !important",
        padding: "0px 15px !important",
        fontFamily: "'Urbanist', sans- serif !important",
        borderRadius: "0 !important",
    },
    megaMenu: {
        marginBottom: 5,
        padding: 5,
        "&.MuiContainer-maxWidthXl": {
            maxWidth: 1310,
        }
    },
    menuContainer: {
        height: "100%",
    },
    categoriesMenu: {
        height: "100%"
    },
})


const Home = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { listProductsPaging, cart } = useSelector((state) => state.product);
    const { listCategory } = useSelector(state => state.category);
    const { listNews } = useSelector(state => state.news)

    console.log(cart);

    useEffect(() => {
        dispatch(GetListCategory())
        dispatch(GetAllProductPaging(1, 6));
        dispatch(GetNewsList())
    }, []);

    const handleAddToCart = (product) => {
        dispatch(action(ADD_TO_CART_SUCCESS, product));
    }
    

    return (
        <>
            <div className={ classes.megeMenuContainer}>
                <Container maxWidth="xl" className={classes.megaMenu}>
                    <Grid container spacing={1} className={classes.menuContainer}>
                        <TopMegaMenu />
                        <Grid item md={2}>
                            <Paper className={classes.categoriesMenu} elevation={0}>
                                <CategoryDrawer listCategory={listCategory} />
                            </Paper>                           
                        </Grid>
                        <Grid item md={10}>
                            <Grid container>
                                <Grid item md={8}>
                                    <HomeCarousel />
                                    <Grid container>
                                        {posterList.centerPoster.map((item) => (
                                            <Grid item md={6} key={item.id}>
                                                <PosterCard hef={item.hef} imgSrc={item.imageSrc} />
                                            </Grid>
                                        ))}
                                    </Grid>                                   
                                </Grid>
                                <Grid item md={4}>
                                    {posterList.rightPoster.map((item) => (
                                        <Grid item md={12} key={item.id}>
                                            <PosterCard hef={item.hef} imgSrc={item.imageSrc} />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                            
                        </Grid>
                        
                    </Grid>
                </Container>
            </div>
            <Container maxWidth="xl" className={classes.megaMenu}>
                <Grid container spacing={1}>
                    {posterList.bottomPoster.map((item) => (
                        <Grid item md={3} key={item.id}>
                            <PosterCard hef={item.hef} imgSrc={item.imageSrc} />
                        </Grid>
                    ))}

                </Grid>
            </Container>
            <Container maxWidth="xl" className={classes.megaMenu}>
                <Grid container className={classes.newProduct}>
                    <Grid item xs={12} className={classes.viewAll}>
                        <Typography variant="h6" component="h6" align="center" className={classes.newProductTitle}>Sản phẩm mới - Miễn phí giao hàng</Typography>
                        <Button component={Link} to="/listproducts" className={classes.viewAllButton}>Xem tất cả</Button>
                    </Grid>
                    {listProductsPaging.map((item) => (
                        <Grid item md={2} sm={6} xs={12}
                            className={classes.productCard}
                            key={item.maSp}
                        >
                            <ShopProductCard product={item} onClickAddToCard={handleAddToCart}/>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Container maxWidth="xl" className={classes.megaMenu}>
                <div className={classes.newProductTitle}>
                    
                </div>
                <Grid container className={classes.newProduct}>
                    <Grid item xs={12} className={classes.viewAll}>
                        <Typography variant="h6" component="h6" align="center" className={classes.newProductTitle}>News</Typography>
                        <Button component={Link} to="/#" className={classes.viewAllButton}>View all</Button>
                    </Grid>
                    {listNews.map((item) => (
                        <Grid item md={2} sm={6} xs={12}
                            className={classes.productCard}
                            key={item.maTinTuc}
                        >
                            <NewsCard post={item} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
}

export default Home;