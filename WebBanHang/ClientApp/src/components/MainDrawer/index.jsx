import React from "react";
import CategoryDrawer from "../CategoryDrawer/CategoryDrawer";
import { Box, Divider, List, Button, ListItem, Toolbar, Avatar } from "@mui/material"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { useSelector } from "react-redux"


const AccountButton = styled(Button)(({ theme }) => ({
    color: "#000",
    marginTop: 7,
    marginLeft: "17px",
    //fontFamily: "'Urbanist', sans- serif",
    fontSize: "13px !important",
    "&:hover": {
        color: "#000",
        textDecoration: "none !important"
    },
    [theme.breakpoints.down("1210")]: {
        fontSize: "10px !important",
        marginLeft: "11px",
    },
}));

const CustomTypography = styled('h3')({
    color: "red",
    fontWeight: 600
})


const CustomListItem = styled(ListItem)({
    padding: "0px !important",
})

const MainDrawer = ({ toggleDrawer }) => {

    const { customor, isCustomorLogin } = useSelector(state => state.user)

    return (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <Toolbar>
                <CustomTypography>GEARVN</CustomTypography>
            </Toolbar>
            <Divider />
            <List>
                {isCustomorLogin ? (
                    <>
                        <AccountButton type="button">
                            <Avatar src={customor.image} alt="account_image" sx={{ width: 26, height: 26, marginRight: "13px" }} />
                            {customor.account}
                        </AccountButton>
                    </>
                ) : <>
                        <CustomListItem>
                            <AccountButton component={Link} to="/login" startIcon={<AccountCircleIcon style={{ fontSize: 29 }} />}>Đăng nhập</AccountButton>
                        </CustomListItem>
                        <CustomListItem>
                            <AccountButton component={Link} to="/register" startIcon={<AssignmentIndIcon style={{ fontSize: 29 }} />}>Đăng ký</AccountButton>
                        </CustomListItem>
                </>}
                
            </List>
            <Divider />
            <CategoryDrawer />
            
            
        </Box>
        )
}

export default MainDrawer;