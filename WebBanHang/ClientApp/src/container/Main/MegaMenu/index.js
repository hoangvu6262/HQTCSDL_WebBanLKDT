import React from "react";
import CategoryDrawer from "../../../components/CategoryDrawer/CategoryDrawer";
import posterList from "./posterList.js";
import HomeCarousel from "../../../components/Carousel/HomeCarousel";
import PosterCard from "../../../components/PosterCard";
import { Grid, Container, Paper, Hidden } from "@mui/material"
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
    megeMenuContainer: {
        paddingBottom: 7,
        //backgroundImage: "url('https://mui.com/static/themes/onepirate/productCurvyLines.png')",
        backgroundColor: "#f1f0f1"
    },
    megaMenu: {
        marginBottom: 5,
        //padding: 10,
        "&.MuiContainer-maxWidthXl": {
            maxWidth: 1310,
        }
    },
    menuContainer: {
        height: "100%",
    },
    categoriesMenu: {
        height: "100%"
    },
})

const MegaMenu = () => {
    const classes = useStyles();

    const { listCategory } = useSelector(state => state.category);

    return (
        <>
            <div className={classes.megeMenuContainer}>
                <Container maxWidth="xl" className={classes.megaMenu}>
                    <Grid container spacing={1} className={classes.menuContainer}>
                        <Hidden mdDown>
                            <Grid item md={2}>
                                <Paper className={classes.categoriesMenu} elevation={0}>
                                    <CategoryDrawer listCategory={listCategory} />
                                </Paper>
                            </Grid>
                        </Hidden>
                        
                        <Grid item md={10}>
                            <Grid container>
                                <Grid item lg={8} sm={12}>
                                    <HomeCarousel />
                                    <Grid container>
                                        {posterList.centerPoster.map((item) => (
                                            <Grid item sm={6} xs={ 12} key={item.id}>
                                                <PosterCard hef={item.hef} imgSrc={item.imageSrc} />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Grid>
                                <Hidden lgDown>
                                    <Grid item lg={4}>
                                        {posterList.rightPoster.map((item) => (
                                            <Grid item md={12} key={item.id}>
                                                <PosterCard hef={item.hef} imgSrc={item.imageSrc} />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Hidden>
                            </Grid>

                        </Grid>

                    </Grid>
                </Container>

            </div>
            <Container maxWidth="xl" className={classes.megaMenu}>
                <Grid container spacing={1}>
                    {posterList.bottomPoster.map((item) => (
                        <Grid item md={3} sm={6} xs={ 12} key={item.id}>
                            <PosterCard hef={item.hef} imgSrc={item.imageSrc} />
                        </Grid>
                    ))}

                </Grid>
            </Container>
        </>
        )
}

export default MegaMenu;