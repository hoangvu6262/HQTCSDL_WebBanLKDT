import React, { useState, useEffect } from "react";
import AdminHeader from "../../../components/AdminHeader";
import { Paper, Grid, Stack, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Search from "../../../components/Search";
import FormDialog from "../../../components/Dialog";
import BillForm from "./BillForm";
import { SearchNewssByTitle, GetNewsList } from "../../../redux/actions/news.action";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../../components/Notification";
import NewsCard from "../../../components/Card/NewsCard";

const useStyles = makeStyles({
    root: {
        padding: "0 15px !important",
        height: "100%",
        maxWidth: "100%",
        margin: "auto",
        // overflowX: "auto",
    },
    searchPaper: {
        marginTop: 30,
        padding: "10px",
    },
    autocompletePaper: {
        marginTop: 3,
        padding: "10px",
    },
    tablePaper: {
        padding: 15,
        position: "relative",
        marginTop: 5,
    },
    input: {
        "& .MuiOutlinedInput-root": {
            "& input": {
                padding: 12,
            },
            "& fieldset": {
                border: "none",
            },
        },
    },
    actionButton: {
        padding: "10px 5px 20px 5px",
        display: "flex",
        justifyContent: "space-between"
    },
    button: {
        fontFamily: '"Public Sans", sans-serif !important',
        fontSize: "11px !important",
        fontWeight: "400 !important",
    }
});


export default function News() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { notification, listNews } = useSelector((state) => state.news);

    useEffect(() => {
        dispatch(GetNewsList());
    },[])

    const [openDialog, setOpenDialog] = useState({
        open: false,
        isAddNews: false,
        title: "",
    });


    const handleSearchNews = (e) => {
        console.log(e.target.value);

        if (e.target.value !== "") {
            dispatch(SearchNewssByTitle(e.target.value))
        } else {
            dispatch(GetNewsList())
        }
    }

    const handleOnlick = () => {
        setOpenDialog({
            open: true,
            isAddNews: true,
            title: "Thêm News",
        });
    };

    // close notification
    const handleCloseNotification = () => {
        dispatch({
            type: "CLOSE_NOTIFICATION",
            payload: false,
        });
    };

    console.log(listNews);

    return (
        <>
            <Grid container>
                <Grid item xs={12} className={classes.root}>
                    <AdminHeader title="Quản lý sản phẩm" handleOnlick={handleOnlick} />
                    <Paper className={classes.searchPaper}>
                        <Search
                            id="search"
                            name="search"
                            placeholder="Search News by Title..."
                            onChange={handleSearchNews}
                        />
                    </Paper>
                    <Paper className={classes.tablePaper}>
                        <Grid container spacing={ 2}>
                            {listNews.map((news, index) => {
                                return (
                                    <Grid item xs={12} lg={ 3} sm={6} key={news.maTinTuc}>
                                        <NewsCard post={news} />
                                        <Stack direction="row" spacing={2} className={ classes.actionButton}>
                                            <Button
                                                variant="contained"
                                                color="info"
                                                className={classes.button}
                                            >
                                                Xem chi tiết
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                className={classes.button}
                                            >
                                                Xóa tin tức
                                            </Button>
                                        </Stack>
                                    </Grid>                                   
                                );
                            })}
                        </Grid>
                        
                    </Paper>
                </Grid>
            </Grid>

            <Notification notifyAlert={notification} onClose={handleCloseNotification} />

            <FormDialog openDialog={openDialog} setOpenDialog={setOpenDialog}>
                <BillForm openDialog={openDialog} setOpenDialog={setOpenDialog} />
            </FormDialog>
        </>
    );
}
