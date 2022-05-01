import React from "react";
import TopMegaMenuList from "./TopMegaMenuList.js";
import { Grid, Paper, Container, Hidden  } from "@mui/material";
import { makeStyles } from "@mui/styles";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
//import { useSelector } from "react-redux";
import CategoryDrawer from "../CategoryDrawer/CategoryDrawer";


const useStyles = makeStyles((theme) => ({
    categoriesMenuContainer: {
        backgroundColor: "#505050",
        color: "#fff"
    },
    categoriesMenu: {
        padding: "9px 7px",
        display: "flex",
        justifyContent: "space-around",
        alignContent: "center",
        alignItems: "center",
        backgroundColor: "#505050 !important",
        color: "#fff !important",
        fontSize: "20px !important"
    },
    categoriesMenuIcon: {
        width: "20px !important",
        height: "20px !important",
    },
    topMenu: {
        padding: "8px 8px 8px 8px",

        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        cursor: "pointer",
        textAlign: "center",
        color: "#505050  !important",
        border: "1px solid #505050",
        "& img": {
            marginRight: 11,
            width: 20,
            height: 20,
            
        },
        "&:hover": {
            backgroundColor: "#d7202c !important",
            color: "#fff  !important",
            border: "1px solid #d7202c ",
        }
        
    },
    title: {
        marginBottom: "0px !important",
        textTransform: "uppercase !important",
        fontSize: "11px !important",
        fontWeight: "700 !important"
    },

    megeMenuContainer: {
        paddingLeft: "0px !important",
        paddingBottom: 7,
        backgroundColor: "#f1f0f1",
        width: "100%",
        
    },
    megaMenu: {
        marginBottom: 5,
        padding: 5,
        "&.MuiContainer-maxWidthXl": {
            paddingLeft: "10px !important",
            maxWidth: 1310,
        }
    },
    menuContainer: {
        height: "100%",
    },
    categoriesMenuDropdown: {
        height: "100%",
        width: "100%"
    },
    show: {
        display: "none"
    },

    hide: {
        display: "none"
    },
    "@media (max-width: 1273px)": {
        title: {
            fontSize: "9px !important",
        }
    },
    "@media (max-width: 1200px)": {
        topMenu: {
            padding: "10px 8px 10px 8px",
        }
    }
}))

const TopMegaMenu = ({ showCategory, show, setShow }) => {
    const classes = useStyles();
    //const [showCategory, setShowCategory] = useState(false);
    //const [show, setShow] = useState(false);

    //const { listCategory } = useSelector(state => state.category);

 

    return (
        <>
            <Grid item md={2}>
                <Paper elevation={0} className={classes.categoriesMenu} onMouseEnter={() => setShow(true)} onClick={ () => setShow(false)}>
                    <FormatListBulletedIcon className={classes.categoriesMenuIcon }/>
                    <p className={classes.title}>Danh mục sản phẩm</p>
                </Paper>
            </Grid>
            {TopMegaMenuList.map((item) => (
                <Grid item md={2} key={item.id}>
                    <Paper elevation={0} className={classes.topMenu}>
                        <Hidden lgDown>
                            <img src={item.icon} alt="category-icon" />
                        </Hidden>
                        <p className={classes.title}>{item.name}</p>
                    </Paper>
                </Grid>               
            ))}
            
            <div className={showCategory && show ? classes.megeMenuContainer : classes.hide}>
                <Container maxWidth="xl" className={classes.megaMenu}>
                    <Grid container spacing={1} className={classes.menuContainer}>

                        <Grid item md={2} className={classes.categoriesMenuDropdown}>
                            <Paper className={classes.categoriesMenuDropdown} elevation={0}>
                                <CategoryDrawer />
                            </Paper>
                        </Grid>

                    </Grid>
                </Container>

            </div>
        </>
        )
}

export default TopMegaMenu;