import * as React from 'react';
import { Link } from "react-router-dom"
import { ListItemText, Toolbar, MenuList, MenuItem } from "@mui/material";
import { styled } from "@mui/styles"

const CustomContainer = styled('div')({
    border: "2px solid #ddcece",
    "& h4": {
        fontFamily: "'Urbanist', sans- serif !important",
    }
})

const AccToggleText = styled(ListItemText)({
    paddingLeft: 25,
    paddingBottom: 20,
    color: "#000",
    "& span": {
        fontFamily: "'Urbanist', sans- serif !important",
    }
})

function CategoryDrawer(props) {
    const { listCategory } = props;


    return (
        <CustomContainer>
            <Toolbar>
                <h4>Categories: </h4>
            </Toolbar>
            <MenuList>
                <MenuItem component={Link} to="/listproducts">
                    <AccToggleText>All</AccToggleText>
                </MenuItem>
                {listCategory.map((category) => {
                    return (
                        <MenuItem key={category.maDanhMuc} component={Link} to={`/list-products&categoryid=${category.maDanhMuc}`}>
                            <AccToggleText>{category.tenDanhMuc}</AccToggleText>
                        </MenuItem>
                    )
                })}
            </MenuList>
                
            
            
        </CustomContainer>
    );
}



export default CategoryDrawer;
