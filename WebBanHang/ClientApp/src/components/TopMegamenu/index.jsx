import React from "react";
import TopMegaMenuList from "./TopMegaMenuList.js"
import { Grid, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

const useStyles = makeStyles({
    categoriesMenuContainer: {
        backgroundColor: "#505050",
        color: "#fff"
    },
    categoriesMenu: {
        padding: "6px 7px",
        display: "flex",
        justifyContent: "space-around",
        alignContent: "center",
        alignItems: "center",
        backgroundColor: "#505050 !important",
        color: "#fff !important",
        fontSize: "20px !important"
    },
    topMenu: {
        padding: "2px 7px 6px 7px",
        cursor: "pointer",
        textAlign: "center",
        color: "#505050  !important",
        border: "1px solid #505050",
        "& img": {
            marginRight: 11,
            width: 20,
            height: 20
        },
        "&:hover": {
            backgroundColor: "#d7202c !important",
            color: "#fff  !important"
        }
        
    },
    title: {
        textTransform: "uppercase !important",
        fontSize: "11px !important",
        fontWeight: "600 !important"
    }
})

const TopMegaMenu = () => {
    const classes = useStyles();

    return (
        <>
            <Grid item md={2}>
                <Paper elevation={0} className={classes.categoriesMenu}>
                    <FormatListBulletedIcon />
                    <Typography variant="subtitle2" component="subtitle2">Danh mục sản phẩm</Typography>
                </Paper>
            </Grid>
            {TopMegaMenuList.map((item) => (
                <Grid item md={2} key={item.id}>
                    <Paper elevation={0}  className={classes.topMenu}>
                        <img src={item.icon} alt="" />
                        <Typography variant="subtitle2" component="subtitle2" className={classes.title}>{item.name}</Typography>
                    </Paper>
                </Grid>               
             ))}
        </>
        )
}

export default TopMegaMenu;