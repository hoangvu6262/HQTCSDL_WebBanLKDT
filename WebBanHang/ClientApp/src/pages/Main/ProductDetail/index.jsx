import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetProductDetailById, GetRelatedProducts } from "../../../redux/actions/product.action";
import { Grid, Paper, Divider, Container, Box, Chip, Rating, Alert, Button, AppBar, IconButton  } from '@mui/material';
import { makeStyles } from "@mui/styles";
import CustomCarousel from "../../../components/Carousel/CustomCarousel";
import { styled } from '@mui/material/styles';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { ADD_TO_CART_SUCCESS } from "../../../redux/constants/product.constant";
import action from "../../../redux/actions/action";
import ShopProductCard from "../../../components/Card/ShopProductCard"


const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
        color: '#ff3d47',
    },
});

const useStyle = makeStyles({
    root: {
        marginTop: 30,
        marginBottom: 30,
        padding: "10px 25px 25px 25px",
        borderRadius: "0px !important",
        border: "1px solid #ddcece",
        "& h2": {
            marginBottom: 0,
            fontSize: 50,
            fontWeight: 400,
            color: "rgb(33, 43, 54)",
            fontFamily: "'Urbanist', sans- serif !important",
        },
    },
    productDetailContent: {
        marginTop: 25,
        padding: "10px",
        borderRadius: "0px !important",
        border: "1px solid #ddcece !important",
        boxShadow: "none !important",
    },
    productDetailCarousel: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
    },
    productDetailInfo: {
        padding: "20px",
    },

    category: {
        paddingTop: "15px",
        "& p": {
            marginBottom: 0,
            fontSize: 18,
            fontWeight: 400,
            color: "rgb(33, 43, 54)",
            fontFamily: "'Urbanist', sans- serif !important",
        },
    },

    divider: {
        margin: "25px 0",
    },
    price: {
        marginBottom: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        "& p": {
            marginBottom: 0,
            fontSize: 20,
            fontWeight: 400,
            color: "rgb(33, 43, 54)",
            fontFamily: "'Urbanist', sans- serif !important",
        },
    },
    alert: {
        width: 150,
        fontSize: 15,
        fontFamily: "'Urbanist', sans- serif !important",
    },

    buttonGroup: {
        marginTop: 50,
    },
    buttonContainer: {
        padding: "7px 5px"
    },
    buttonEdit: {
        backgroundColor: "rgb(24, 144, 255)",
        padding: "15px 15px",
        fontSize: 15,
        fontWeight: 700,
        fontFamily: "'Urbanist', sans- serif !important",
        boxShadow: "rgba(24, 144, 255, 0.4) 0px 50px 100px - 20px, rgba(24, 144, 255, 0.25) 0px 30px 60px - 30px",
    },

    buttonDelete: {

        padding: "15px 15px"
    },
    productDetailDiscription: {
        marginTop: 15,
        borderRadius: "0px !important",
        //border: "1px solid #ddcece !important",
        //boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        "& p": {
            padding: "20px",
            marginBottom: 0,
            // paddingLeft: 15,
            fontSize: 15,
            fontWeight: 400,
            color: "rgb(33, 43, 54)",
            fontFamily: "'Urbanist', sans- serif !important",
        },
    },
    appbar: {
        padding: "10px 20px",
        backgroundColor: "rgb(244 246 248) !important",
        color: "rgb(33, 43, 54) !important",
        fontWeight: 600,
        fontFamily: "'Urbanist', sans- serif !important",
        boxShadow: "none !important",
    },
    quantity: {
        display: "flex",

    },
    relatedProducts: {
        padding: 15,
    }
})

const MainProductDetail = () => {
    const classes = useStyle();
    const { id } = useParams();
    const dispatch = useDispatch();
    const [cartQuantity, setCartQuantity] = useState(1);

    const { productDetail, listRelatedProducts } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(GetProductDetailById(id))
        dispatch(GetRelatedProducts(id, "tai nghe"))
    }, []);

    console.log(listRelatedProducts)

    const productIamge = [
        {
            id: 1,
            imgPath: productDetail.hinhAnh
        },
        {
            id: 2,
            imgPath: productDetail.anh1
        },
        {
            id: 3,
            imgPath: productDetail.anh2
        },
        {
            id: 4,
            imgPath: productDetail.anh3
        },

    ]


    const renderCategory = (categoryId) => {
        switch (categoryId) {
            case 1:
                return (<Chip color="warning" variant="filled" label="Màn hình"  />);
            case 2:
                return (<Chip color="warning" variant="filled" label="Bàn phím"  />);
            case 3:
                return (<Chip color="warning" variant="filled" label="Tai nghe" />);
            case 4:
                return (<Chip color="warning" variant="filled" label="Chuột" />);
            default:
                return (<Chip color="warning" variant="filled" label="Màn hình"  />);
        }
    }

    const renderQuantity = (quantity) => {
        if (quantity === 0) {
            return (
                <div className={classes.alert}>
                    <Alert severity="error">Out of stock!</Alert>
                </div>
            );
        } else {
            return (
                <div className={classes.alert}>
                    <Alert severity="success">In stock!</Alert>
                </div>
            );
        }
    }

    const renderListComments = (comments) => {
        return comments.map((comment) => {
            return (
                <div className={classes.price} key={comment.maBl}>
                    <div>
                        <p>Mã Khách Hàng: {comment.maKhachHang} - {comment.thoiGian} </p>
                        <p> {comment.noiDungBinhLuan} </p>
                    </div>

                    <p>
                        <Button variant="outlined" color="error" fullWidth>X</Button>
                    </p>
                </div>
            );
        })

    }

    const handleMinusQuantity = () => {
        setCartQuantity(cartQuantity - 1);
    }

    const handleAddQuantity = () => {
        setCartQuantity(cartQuantity + 1);
    }

    const handleAddToCart = (product) => {
        dispatch(action(ADD_TO_CART_SUCCESS, {
            maSp: product.maSp,
            tenSp: product.tenSp,
            hinhAnh: product.hinhAnh,
            soLuong: cartQuantity,
            donGia: product.donGia,
            total: product.donGia * cartQuantity
        }));
    }

    const handleAddToCartRelated = (product) => {
        dispatch(action(ADD_TO_CART_SUCCESS, product));
    }

    return (
        <>
            <Container className={classes.root}>
                <Paper className={classes.productDetailContent}>
                    <Grid container>
                        <Grid item md={7} xs={12} className={classes.productDetailCarousel}>
                            <CustomCarousel images={productIamge} />
                            <Divider orientation="vertical" flexItem style={{ height: "90%", margin: "auto" }} />
                        </Grid>

                        <Grid item md={5} xs={12} className={classes.productDetailInfo}>
                            {renderQuantity(productDetail.soLuongCon)}
                            <h2>{productDetail.tenSp}</h2>
                            <StyledRating name="read-only" size="large" value={4} readOnly />

                            <Divider className={classes.divider} />
                            <div className={classes.category}>
                                <div className={classes.price}>
                                    <p>Category</p>
                                    <span>
                                        {renderCategory(productDetail.maDanhMuc)}
                                    </span>
                                </div>
                                <div className={classes.price}>
                                    <p>Price</p>
                                    <p style={{ color: "rgb(255, 72, 66)" }}>
                                        {parseInt(productDetail.donGia).toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND'
                                        })}
                                    </p>
                                </div>

                                <div className={classes.price}>
                                    <p>Quantity </p>
                                    <div className={classes.quantity}>
                                        <IconButton onClick={handleMinusQuantity} className={classes.button} disabled={cartQuantity === 1 ?? false}>
                                            <IndeterminateCheckBoxIcon />
                                        </IconButton>
                                        <p>{cartQuantity}</p>
                                        <IconButton onClick={handleAddQuantity} className={classes.button}>
                                            <AddBoxIcon />
                                        </IconButton>
                                    </div>
                                </div>
                                <div className={classes.price}>
                                    <p>Available: {productDetail.soLuongCon} </p>
                                </div>
                                <div className={classes.buttonGroup}>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        className={classes.buttonEdit}
                                        onClick={() => handleAddToCart(productDetail)}
                                        disabled={productDetail.soLuongCon === 0 ?? true}
                                    >
                                        Add to Cart
                                    </Button>
                                </div>
                            </div>

                        </Grid>
                    </Grid>


                </Paper>
                <Box className={classes.productDetailDiscription}>
                    <AppBar position="static" className={classes.appbar}>
                        Discription
                    </AppBar>
                    <p>{productDetail.moTa}</p>
                </Box>
                <Box className={classes.productDetailDiscription}>
                    <AppBar position="static" className={classes.appbar}>
                        Realated Products
                    </AppBar>
                    <div className={ classes.relatedProducts}>
                        <Grid container spacing={2}>
                            {listRelatedProducts.map((product) => {
                                return (<Grid item md={3} xs={6} key={product.maSp}>
                                    <ShopProductCard product={product} onClickAddToCard={handleAddToCartRelated} />
                                </Grid>)

                            })}
                        </Grid>
                    </div>
                </Box>
                <Box className={classes.productDetailDiscription}>
                    <AppBar position="static" className={classes.appbar}>
                        Comments
                    </AppBar>
                    {productDetail.binhLuans.length > 0 ? renderListComments(productDetail.binhLuans) : (<p>No Comment.</p>)}
                </Box>

            </Container>

        </>
    );
}
export default MainProductDetail;