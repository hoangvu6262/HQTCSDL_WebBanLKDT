import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetProductDetailById, GetRelatedProducts } from "../../../redux/actions/product.action";
import { Container } from '@mui/material';
import { makeStyles } from "@mui/styles";
import Notification from "../../../components/Notification";

import ProductDetailContainer from "../../../container/Main/ProductDetailContainer"
import ProductDescriptionContainer from "../../../container/Main/ProductDescriptionContainer"
import ProductCommentContainer from "../../../container/Main/ProductCommentContainer"





const useStyles = makeStyles({
    root: {
        paddingTop: 20,
        position: "relative",
    },
    card: {
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
})

const MainProductDetail = () => {
    const classes = useStyles();
    const { id } = useParams();
    const dispatch = useDispatch();
    

    const { productDetail, listRelatedProducts } = useSelector((state) => state.product);
    const { notification } = useSelector(state => state.comment);
    const { customor } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(GetProductDetailById(id))
        dispatch(GetRelatedProducts(id, "tai nghe"))
    }, []);

    useEffect(() => {
        dispatch(GetProductDetailById(id))
        dispatch(GetRelatedProducts(id, "tai nghe"))
    }, [id]);

    return (
        <>
            <Container className={classes.root}>
                <div className={classes.card}>
                    <ProductDetailContainer productDetail={productDetail}/>
                    <ProductDescriptionContainer productDetail={productDetail} listRelatedProducts={listRelatedProducts} />
                    <ProductCommentContainer productDetail={productDetail} id={id} customor={customor} />

                </div>
            </Container>
            <Notification notifyAlert={notification} />
        </>
    );
}
export default MainProductDetail;