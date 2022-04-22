import React from "react";
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import CartProductCard from "../../../components/Card/CartProductCard";
import { Grid, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { CheckOut, AddBillDetail } from "../../../redux/actions/bill.action";
import Notification from "../../../components/Notification"

const useStyles = makeStyles({
    root: {
        padding: "30px 80px",
    },
    emptyCart: {
        fontFamily: "'Urbanist', sans- serif",
    },
    card: {
        padding: 20,
        //marginBottom: 20,
        //boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        fontFamily: "'Urbanist', sans- serif",
    },
    checkout: {
        marginTop: "35px !important",
        border: "2px solid #f2eaea",
        padding: 20,
        fontFamily: "'Urbanist', sans- serif",
        height: 350,
        borderRadius: 5
    },
    checkoutContainer: {
        display: "flex",
        justifyContent: "space-between",
        margin: "20px 0",
        "& h4": {
            fontWeight: 400
        },
        "& p": {
            fontSize: 20
        }
    },
    title: {
        padding: "20px 0",
        fontFamily: "'Urbanist', sans- serif",
    },
    shoppingButton: {
        border: "2px solid #000 !important",
        fontSize: "15px !important",
        color: "#000 !important",
        padding: "10px 15px !important",
        fontFamily: "'Urbanist', sans- serif !important",
        borderRadius: "0 !important",
    },
    
})

const Cart = () => {
    const { cart } = useSelector(state => state.product);
    const { notification } = useSelector((state) => state.bill);
    const { isCustomorLogin, customor } = useSelector(state => state.user);
    const classes = useStyles();

    const dispatch = useDispatch()

    const EmptyCart = () => (
        <div className={ classes.emptyCart}>
            <h2>No item, <Link to="/">Shopping now!</Link></h2>
        </div>
    );

    const ShoppingCart = () => {
        return cart.products.map((item, index) => (
            <div key={item.maSp} className={classes.card}>
                <CartProductCard product={item} index={index}/>
            </div>
        ))
    }

    const { products } = cart;

    const handleCheckout = () => {
        if (isCustomorLogin) {
            dispatch(CheckOut({
                maKhachHang: customor.id,
                tongTien: cart.total,
                chiTietHoaDons: products
            }))
        }
        
    }

    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <Grid container>
                    <Grid item xs={6}>
                        <Button component={Link} to="/" className={classes.shoppingButton}>Continue Shopping</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <p>Shopping Bag({cart.quantity})</p>
                    </Grid>
                </Grid>
                
            </div>
            <Grid container spacing={ 3}>
                <Grid item md={9} xs={ 12}>
                    {cart.quantity === 0 ? EmptyCart() : ShoppingCart()}
                </Grid>
                <Grid item md={3} xs={ 12} className={ classes.checkout}>
                    <h3>ORDER SUMMARY</h3>
                    <div className={classes.checkoutContainer}>
                        <h5>SubTotal:</h5>
                        <p>{parseInt(cart.total).toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                        })}</p>
                    </div>
                    <div className={classes.checkoutContainer}>
                        <h5>SubQuantity:</h5>
                        <p>{cart.quantity}</p>
                    </div>
                    <div className={classes.checkoutContainer}>
                        <h3>Total:</h3>
                        <h3>{parseInt(cart.total).toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                        })}</h3>
                    </div>
                    <Button color="success" variant="contained" fullWidth onClick={ handleCheckout}>Checkout now</Button>
                </Grid>
            </Grid>
            <Notification notifyAlert={notification} />
        </div>
    );
}

export default Cart;