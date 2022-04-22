import React, { useState} from "react";
import { Grid, Paper, Divider, Button, IconButton, Chip, Rating, Alert } from '@mui/material';
import { makeStyles } from "@mui/styles";
import { styled } from '@mui/material/styles';
import { ADD_TO_CART_SUCCESS } from "../../../redux/constants/product.constant";
import action from "../../../redux/actions/action";
import CustomCarousel from "../../../components/Carousel/CustomCarousel";
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import AddBoxIcon from '@mui/icons-material/AddBox';
import {useDispatch} from "react-redux"

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
        color: '#ff3d47',
    },
});

const useStyles = makeStyles({
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
        marginBottom: 10,
        fontFamily: "'Urbanist', sans- serif !important",
    },
    alertContent: {
        fontSize: "12px !important",
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
    quantity: {
        display: "flex",

    },
})


const ProductDetailContainer = ({ productDetail}) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [cartQuantity, setCartQuantity] = useState(1);

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

    const renderQuantity = (quantity) => {
        if (quantity === 0) {
            return (
                <div className={classes.alert}>
                    <Alert severity="error" className={classes.alertContent}>Out of stock!</Alert>
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

    return (
        <>
            <Paper className={classes.productDetailContent}>
                <Grid container>
                    <Grid item md={7} xs={12} className={classes.productDetailCarousel}>
                        <CustomCarousel images={productIamge} />
                        <Divider orientation="vertical" flexItem style={{ height: "90%", margin: "auto" }} />
                    </Grid>

                    <Grid item md={5} xs={12} className={classes.productDetailInfo}>
                        <h2>{productDetail.tenSp}</h2>
                        <StyledRating name="read-only" size="large" value={4} readOnly />
                        {renderQuantity(productDetail.soLuongCon)}

                        <Divider className={classes.divider} />
                        <div className={classes.category}>
                            
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
                                    <IconButton onClick={handleAddQuantity} className={classes.button} disabled={cartQuantity === productDetail.soLuongCon ?? false}>
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
        </>
        )
}

export default ProductDetailContainer;