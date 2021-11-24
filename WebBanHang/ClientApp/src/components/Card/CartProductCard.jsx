import React, { useState} from "react";
import { Grid, IconButton, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { MINUS_PRODUCT_QUANTITY_SUCCESS, ADD_PRODUCT_QUANTITY_SUCCESS, CART_REMOVE_PRODUCT_SUCCESS } from "../../redux/constants/product.constant";
import { useDispatch } from "react-redux";
import action from "../../redux/actions/action";

const useStyles = makeStyles({
    container: {
        fontFamily: "'Urbanist', sans- serif",
    },
    infoContainer: {
        paddingTop: "60px !important",
        overflow: "hidden",
    },
    image: {
        width: 200,
    },
    quantity: {
        display: "flex",

    },
    button: {
        width: 30,
        height: 30
    }
})

const CartProductCard = ({ product, index }) => {
    const { tenSp, hinhAnh, soLuong, donGia, total } = product;

    const dispatch = useDispatch();

    const classes = useStyles();

    const [cartQuantity, setCartQuantity] = useState(soLuong);
    const [totalPrice, setTotalPrice] = useState(total)

    const handleMinusQuantity = () => {
        setCartQuantity(cartQuantity - 1);
        setTotalPrice(totalPrice - donGia);
        dispatch(action(MINUS_PRODUCT_QUANTITY_SUCCESS, { index, donGia }))
    }

    const handleAddQuantity = () => {
        setCartQuantity(cartQuantity + 1);
        setTotalPrice(totalPrice + donGia);
        dispatch(action(ADD_PRODUCT_QUANTITY_SUCCESS, { index, donGia }))
    }

    const handleRemoveProduct = () => {
        dispatch(action(CART_REMOVE_PRODUCT_SUCCESS, { index, total: totalPrice, soLuong: cartQuantity }))
    }

    return (
        <>
            <Grid container className={classes.container} spacing={ 3}>
                <Grid item md={3} xs={12}>
                    <img src={hinhAnh} alt={tenSp} className={classes.image} />
                </Grid>
                <Grid item md={9} xs={12} className={classes.infoContainer}>
                    <h4>{tenSp}</h4>
                    <p>Total Price: {parseInt(totalPrice).toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                    })}</p>
                    <div className={classes.quantity}>
                        <IconButton onClick={handleMinusQuantity} className={classes.button} disabled={cartQuantity === 1 ?? false }>
                            <IndeterminateCheckBoxIcon />
                        </IconButton>
                        <p>{cartQuantity}</p>
                        <IconButton onClick={handleAddQuantity} className={classes.button}>
                            <AddBoxIcon />
                        </IconButton>
                    </div>
                    <div>
                        <Button color="error" variant="outlined" onClick={ handleRemoveProduct}>Remove</Button>
                    </div>
                </Grid>
            </Grid>
        </>
    );
}

export default CartProductCard;