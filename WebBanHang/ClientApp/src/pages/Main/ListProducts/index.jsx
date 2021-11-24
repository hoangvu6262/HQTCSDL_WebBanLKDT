import React, { useEffect, useState} from "react";
import { Container, Grid, Drawer, Paper } from "@mui/material";
import { styled, makeStyles } from "@mui/styles";
import CategoryDrawer from "../CategoryDrawer/CategoryDrawer";
import { GetListCategory } from "../../../redux/actions/category.action";
import { GetAllProductPaging, GetProductByCategory } from "../../../redux/actions/product.action"
import { useSelector, useDispatch } from "react-redux";
import ShopProductCard from "../../../components/Card/ShopProductCard";
import action from "../../../redux/actions/action";
import { ADD_TO_CART_SUCCESS } from "../../../redux/constants/product.constant";
import { useParams } from "react-router-dom";


const CustomContainer = styled(Container)({
    paddingTop: 30,
    marginBottom: 30,
    "& h2": {
        fontFamily: "'Urbanist', sans- serif !important",
        textAlign: "center"
    }
})

const CustomPaper = styled(Paper)({
    padding: 20,
    borderRadius: "0px !important",
    border: "2px solid #ddcece",
})

const ListProducts = () => {
    const { listCategory } = useSelector(state => state.category);
    const { listProductsPaging } = useSelector(state => state.product)
    const dispatch = useDispatch();

    const { id } = useParams();

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

    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleAddToCart = (product) => {
        dispatch(action(ADD_TO_CART_SUCCESS, product));
    }

    return (
        <>
            <CustomContainer maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <h2>List Products</h2>
                    </Grid>
                    <Grid item md={3}>
                        <CategoryDrawer listCategory={listCategory}/>
                    </Grid>
                    <Grid item md={9} xs={12}>
                        <CustomPaper>
                            <Grid container spacing={2}>
                                {listProductsPaging.map((product) => {
                                    return (<Grid item md={3} xs={6} key={product.maSp}>
                                        <ShopProductCard product={product} onClickAddToCard={handleAddToCart} />
                                    </Grid>)

                                })}
                            </Grid>
                        </CustomPaper>
                        
                    </Grid>
                </Grid>
            </CustomContainer>
        </>
    );
}

export default ListProducts