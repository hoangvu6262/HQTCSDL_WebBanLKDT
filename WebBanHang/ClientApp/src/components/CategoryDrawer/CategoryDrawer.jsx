import * as React from 'react';
import { Link } from "react-router-dom"
import { MenuList, MenuItem, Typography, Hidden } from "@mui/material";
import { styled, makeStyles } from "@mui/styles";
import { useSelector } from "react-redux"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const CustomContainer = styled('div')({
    height: "100%",
    borderRadius: "7px",
    //border: "0.5px solid #ddcece",
    //backgroundColor: "#fff5f8",
    "& h4": {
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
            marginRight: 12,
            width: 22,
            height: 21
        },
        "&:hover": {
            backgroundColor: "#ea1c04 !important",
            color: "#fff  !important"
        }

    },
    menu: {
        width:"100%",
        display: "flex",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center"
    },
    arrowIcon: {
        fontSize: "14px !important"
    },
    title: {
        fontFamily: "'Roboto', sans-serif !important",
        //textTransform: "uppercase !important",
        fontSize: "14px !important",
        fontWeight: "500 !important"
    }
})

function CategoryDrawer() {
    const { listCategory } = useSelector(state => state.category);
    const classes = useStyles();
    
    return (
        <>
            <CustomContainer>
                <MenuList>
                    <MenuItem component={Link} to="/listproducts" className={classes.categoryItem}>
                        <div className={ classes.menu}>
                            <div>
                                <img src="https://theme.hstatic.net/1000026716/1000440777/14/xxx21.png?v=24652" alt="" />
                                <Typography variant="subtitle2" component="subtitle2" className={classes.title}>All</Typography>
                            </div>
                            <Hidden mdUp>
                                <ArrowForwardIosIcon className={ classes.arrowIcon} />
                            </Hidden>
                        </div>
                        
                    </MenuItem>
                    {listCategory.map((category) => {
                        return (
                            <MenuItem key={category.maDanhMuc} component={Link} to={`/list-products&categoryid=${category.maDanhMuc}&tenDanhMuc=${category.tenDanhMuc}`} className={classes.categoryItem}>
                                
                                <div className={classes.menu}>
                                    <div>
                                        <img src={category.iconDanhMuc} alt="" />
                                        <Typography variant="subtitle2" component="subtitle2" className={classes.title}>{category.tenDanhMuc}</Typography>
                                    </div>
                                    <Hidden mdUp>
                                        <ArrowForwardIosIcon className={classes.arrowIcon} />
                                    </Hidden>
                                </div>
                            </MenuItem>
                        )
                    })}
                    {listCategory.map((category) => {
                        return (
                            <MenuItem key={category.maDanhMuc} component={Link} to={`/list-products&categoryid=${category.maDanhMuc}&tenDanhMuc=${category.tenDanhMuc}`} className={classes.categoryItem}>
                                <div className={classes.menu}>
                                    <div>
                                        <img src={category.iconDanhMuc} alt="" />
                                        <Typography variant="subtitle2" component="subtitle2" className={classes.title}>{category.tenDanhMuc}</Typography>
                                    </div>
                                    <Hidden mdUp>
                                        <ArrowForwardIosIcon className={classes.arrowIcon} />
                                    </Hidden>
                                </div>
                            </MenuItem>
                        )
                    })}
                </MenuList>



            </CustomContainer>
        </>
        
    );
}



export default CategoryDrawer;
