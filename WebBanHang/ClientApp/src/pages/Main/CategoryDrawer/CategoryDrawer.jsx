import * as React from 'react';
import { Link } from "react-router-dom"
import { ListItemText, MenuList, MenuItem, Typography, Hidden } from "@mui/material";
import { styled, makeStyles } from "@mui/styles"

const CustomContainer = styled('div')({
    height: "100%",
    borderRadius: "7px",
    //border: "0.5px solid #ddcece",
    //backgroundColor: "#fff5f8",
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


const useStyles = makeStyles({
    categoryItem: {
        padding: "2px 7px 6px 7px",
        cursor: "pointer",
        textAlign: "center",
        color: "#505050  !important",
        //border: "1px solid #505050",
        "& img": {
            marginRight: 15,
            width: 17,
            height: 17
        },
        "&:hover": {
            backgroundColor: "#d7202c !important",
            color: "#fff  !important"
        }

    },
    title: {
        fontFamily: "'Roboto', sans-serif !important",
        //textTransform: "uppercase !important",
        fontSize: "14px !important",
        fontWeight: "500 !important"
    }
})

function CategoryDrawer(props) {
    const { listCategory } = props;
    const classes = useStyles();

    return (
        <Hidden mdDown>
            <CustomContainer>
                <MenuList>
                    <MenuItem component={Link} to="/listproducts" className={classes.categoryItem}>
                        <img src="https://theme.hstatic.net/1000026716/1000440777/14/xxx21.png?v=24652" alt="" />
                        <Typography variant="subtitle2" component="subtitle2" className={classes.title}>All</Typography>
                    </MenuItem>
                    {listCategory.map((category) => {
                        return (
                            <MenuItem key={category.maDanhMuc} component={Link} to={`/list-products&categoryid=${category.maDanhMuc}`} className={classes.categoryItem}>
                                <img src={category.iconDanhMuc} alt="" />
                                <Typography variant="subtitle2" component="subtitle2" className={classes.title}>{category.tenDanhMuc}</Typography>
                            </MenuItem>
                        )
                    })}
                    {listCategory.map((category) => {
                        return (
                            <MenuItem key={category.maDanhMuc} component={Link} to={`/list-products&categoryid=${category.maDanhMuc}`} className={classes.categoryItem}>
                                <img src={category.iconDanhMuc} alt="" />
                                <Typography variant="subtitle2" component="subtitle2" className={classes.title}>{category.tenDanhMuc}</Typography>
                            </MenuItem>
                        )
                    })}
                </MenuList>



            </CustomContainer>
        </Hidden>
        
    );
}



export default CategoryDrawer;
