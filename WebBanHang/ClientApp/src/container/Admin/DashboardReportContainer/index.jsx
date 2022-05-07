import React, { useEffect} from "react";
import { Grid, Paper } from "@mui/material";
import { styled } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { GetAllUser } from "../../../redux/actions/user.action";
import { GetAllProducts } from "../../../redux/actions/product.action";
import { GetAllBills } from "../../../redux/actions/bill.action";
import { GetListCategory } from "../../../redux/actions/category.action"

import CategoryIcon from '@mui/icons-material/Category';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';


const CustomPaper = styled(Paper)((theme) => ({
    padding: 10,
    display: "flex",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    "& p": {
        marginBottom: 0
    }
}));


const DashboardReportContainer = () => {
    const dispath = useDispatch();
    const { listAllUsers } = useSelector(state => state.user)
    const { listAllProducts } = useSelector(state => state.product)
    const { listAllBills } = useSelector(state => state.bill)
    const { listCategory } = useSelector(state => state.category)


    useEffect(() => {
        dispath(GetAllUser());
        dispath(GetAllProducts());
        dispath(GetAllBills());
        dispath(GetListCategory());
    },[])

    return (
        <>
            <Grid container spacing={ 3}>
                <Grid item md={3} xs={6}>
                    <CustomPaper>
                        <div>
                            <h6>Users</h6>
                            <p>{listAllUsers.length} Items</p>
                        </div>
                        <AccountBoxIcon sx={{ fontSize: 70 }}/>
                    </CustomPaper>
                    
                </Grid>
                <Grid item md={3} xs={6}>
                    <CustomPaper>
                        <div>
                            <h6>Products</h6>
                            <p>{listAllProducts.length} Items</p>
                        </div>
                        <DevicesOtherIcon sx={{ fontSize: 70 }}/>
                    </CustomPaper>
                </Grid>
                <Grid item md={3} xs={6}>
                    <CustomPaper>
                        <div>
                            <h6>Bills</h6>
                            <p>{listAllBills.length} Items</p>
                        </div>
                        <CreditCardIcon sx={{ fontSize: 70 }}/>
                    </CustomPaper>
                </Grid>
                <Grid item md={3} xs={6}>
                    <CustomPaper>
                        <div>
                            <h6>Categories</h6>
                            <p>{listCategory.length} Items</p>
                        </div>
                        <CategoryIcon sx={{ fontSize: 70 }}/>
                    </CustomPaper>
                </Grid>
            </Grid>
        </>
        )
}

export default DashboardReportContainer;