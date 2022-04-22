import React from "react";
import { Link } from "react-router-dom";
import NewsCard from "../../../components/Card/NewsCard";
import { Grid, Typography, Container, Button } from "@mui/material"
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    newsContainer: {
        marginBottom: 5,
        padding: 5,
        "&.MuiContainer-maxWidthXl": {
            maxWidth: 1310,
        }
    },
    newsCardContainer: {
        padding: "20px 5px !important",
    },
    newstTitle: {
        textTransform: "uppercase",
        padding: "0 !important",
        fontSize: "22px !important",
        color: "#fff !important"

    },
    newsCard: {
        padding: "5px 5px 10px 5px",
    },
    viewAll: {
        backgroundColor: "#d7202c",
        //margin: "0px 15px",
        padding: "5px 20px",
        display: "flex",
        justifyContent: "space-between",
    },
    viewAllButton: {
        fontSize: "15px !important",
        color: "#fff !important",
        padding: "0px 15px !important",
        //fontFamily: "'Urbanist', sans- serif !important",
        borderRadius: "0 !important",
    },
})

const NewsContainer = ({ listNews}) => {
    const classes = useStyles();



    return (
        <>
            <Container maxWidth="xl" className={classes.newsContainer}>
                <div className={classes.newProductTitle}>

                </div>
                <Grid container className={classes.newsCardContainer}>
                    <Grid item xs={12} className={classes.viewAll}>
                        <Typography variant="h6" component="h6" align="center" className={classes.newstTitle}>News</Typography>
                        <Button component={Link} to="/#" className={classes.viewAllButton}>Xem tất cả</Button>
                    </Grid>
                    {listNews.map((item) => (
                        <Grid item md={3} sm={6} xs={12}
                            className={classes.newsCard}
                            key={item.maTinTuc}
                        >
                            <NewsCard post={item} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
        )
}

export default NewsContainer;