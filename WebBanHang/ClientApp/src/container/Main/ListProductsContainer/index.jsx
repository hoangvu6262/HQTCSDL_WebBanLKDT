import React, { useEffect} from "react";
import { Grid, Paper } from "@mui/material";
import ShopProductCard from "../../../components/Card/ShopProductCard";
import { styled } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { GetListCategory } from "../../../redux/actions/category.action";
import { GetAllProductPaging, GetProductByCategory } from "../../../redux/actions/product.action";

import action from "../../../redux/actions/action";
import { ADD_TO_CART_SUCCESS } from "../../../redux/constants/product.constant";
import { useParams } from "react-router-dom";

import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const CustomPaper = styled(Paper)({
    //padding: 20,
    borderRadius: "7px !important",
    border: "none",
    boxShadow: "none !important"
})

const CustomImgContainer = styled('div')({
    marginBottom: 20
})

const CustomTittle = styled('div')({
    marginBottom: 30,
    "& h1": {
        fontWeight: 600

    }
})

const CustomDiv = styled('div')({
    padding: "10px 5px",
    backgroundColor: "#f1f0f1",
    borderBottom: "1px solid #eee",
    fontWeight: 400,
    fontSize: 15
})

const ListProductsContainer = () => {
    const { listProductsPaging } = useSelector(state => state.product)

    const dispatch = useDispatch();

    const { id, tenDanhMuc="Tất cả sản phẩm" } = useParams();

    console.log(useParams());

    useEffect(() => {
        dispatch(GetListCategory())
    }, [])


    useEffect(() => {
        if (id) {
            dispatch(GetProductByCategory(id));
        } else {
            dispatch(GetAllProductPaging(1, 10))
        }

    }, [id])

    const handleAddToCart = (product) => {
        dispatch(action(ADD_TO_CART_SUCCESS, product));
    }

    return (
        <>
            <CustomImgContainer>
                <img src="https://file.hstatic.net/1000026716/collection/ux363_gear-vn_1371x436_54d13a12bb724b709f88391dd32db027.jpg" alt="" width="100%" />
            </CustomImgContainer>
            
            <CustomPaper>
                <CustomTittle>
                    <h1>{tenDanhMuc} - Học tập và Làm việc</h1>
                    <CustomDiv>
                        <span>Bạn đang ở: </span>
                        <a href="/">Trang chủ</a>
                        <span><ArrowRightIcon/> {tenDanhMuc} - Học tập và Làm việc</span>
                    </CustomDiv>
                </CustomTittle>
                <Grid container spacing={4}>
                    {listProductsPaging.map((product) => {
                        return (<Grid item md={2.4} xs={6} key={product.maSp}>
                            <ShopProductCard product={product} onClickAddToCard={handleAddToCart} />
                        </Grid>)

                    })}
                </Grid>
            </CustomPaper>
        </>
        )
}

export default ListProductsContainer;