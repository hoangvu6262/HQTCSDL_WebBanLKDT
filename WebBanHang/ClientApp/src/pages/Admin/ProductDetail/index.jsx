import React, { useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetProductDetailById } from "../../../redux/actions/product.action";
import { Grid, Paper, Divider, Container, Box, Chip, Rating, Alert, Button, AppBar, Stack, Item   } from '@mui/material';
import { makeStyles } from "@mui/styles";
import CustomCarousel from "../../../components/Carousel/CustomCarousel";
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { styled } from '@mui/material/styles';


const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
        color: '#ff3d47',
    },
});

const useStyle = makeStyles({
    root: {
        padding: "10px 25px",
        "& h2": {
            marginBottom: 0,
            // paddingLeft: 15,
            fontSize: 50,
            fontWeight: 700,
            color: "rgb(33, 43, 54)",
            fontFamily: "'Dongle', sans- serif",
            //   textTransform: "uppercase",
        },
    },
    productDetailHeader: {
        marginBottom: 10,

    },
    productDetailContent: {
        marginTop: 25,
        padding: "10px",
        borderRadius: 10,
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px !important",
    },
    productDetailCarousel: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
    },
    productDetailInfo: {
        padding: "20px",
    },

    category: {
        paddingTop: "15px",
        "& p": {
            marginBottom: 0,
            // paddingLeft: 15,
            fontSize: 18,
            fontWeight: 700,
            color: "rgb(33, 43, 54)",
            fontFamily: "'Public Sans', sans- serif",
            //   textTransform: "uppercase",
        },
    },

    divider: {
        margin: "25px 0",
    },
    price: {
        marginBottom: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        "& p": {
            marginBottom: 0,
            // paddingLeft: 15,
            fontSize: 20,
            fontWeight: 600,
            color: "rgb(33, 43, 54)",
            fontFamily: "'Public Sans', sans- serif",
            //   textTransform: "uppercase",
        },
    },
    alert: {
        width: 150,
        fontSize: 15,
        fontFamily: "'Public Sans', sans- serif",
    },

    buttonGroup: {
        marginTop: 50,
    },
    buttonContainer: {
        padding: "7px 5px"
    },
    buttonEdit: {
        backgroundColor: "rgb(24, 144, 255)",
        padding: "15px 15px",
        fontSize: 15,
        fontWeight: 700,
        fontFamily: "'Public Sans', sans- serif",
        boxShadow: "rgba(24, 144, 255, 0.4) 0px 50px 100px - 20px, rgba(24, 144, 255, 0.25) 0px 30px 60px - 30px",
    },

    buttonDelete: {
        
        padding: "15px 15px"
    },
    productDetailDiscription: {
        marginTop: 15,
        borderRadius: 10,
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        "& p": {
            padding: "20px",
            marginBottom: 0,
            // paddingLeft: 15,
            fontSize: 15,
            fontWeight: 400,
            color: "rgb(33, 43, 54)",
            fontFamily: "'Public Sans', sans- serif",
        },
    },
    appbar: {
        padding: "10px 20px",
        borderRadius: "10px 10px 0 0",
        backgroundColor: "rgb(244 246 248) !important",
        color: "rgb(33, 43, 54) !important",
        fontWeight: 600,
        fontFamily: "'Public Sans', sans- serif",
        boxShadow: "none !important",
    }
})

const ProductDetail = () => {
    const classes = useStyle();
    const { id } = useParams();
    const dispatch = useDispatch();

    const { productDetail } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(GetProductDetailById(id))
    }, []);


    const productIamge = [
        {
            id: 1,
            imgPath: productDetail.hinhAnh
        },
        {
            id: 2,
            imgPath: productDetail.anh1
        },
        {
            id: 3,
            imgPath: productDetail.anh2
        },
        {
            id: 4,
            imgPath: productDetail.anh3
        },

    ]


    const renderCategory = (categoryId) => {
        switch (categoryId) {
            case 1:
                return (<Chip color="primary" variant="outlined" label="Màn hình" icon={<KeyboardIcon />} />);
            case 2:
                return (<Chip color="primary" variant="outlined" label="Bàn phím" icon={<KeyboardIcon />} />);
            case 3:
                return (<Chip color="primary" variant="outlined" label="Tai nghe" icon={<KeyboardIcon />} />);
            case 4:
                return (<Chip color="primary" variant="outlined" label="Chuột" icon={<KeyboardIcon />} />);
            default:
                return (<Chip color="primary" variant="outlined" label="Màn hình" icon={<KeyboardIcon />} />);
        }
    }

    const renderQuantity = (quantity) => {
        if (quantity === 0) {
            return (
                <div className={classes.alert}>
                    <Alert severity="error">Out of stock!</Alert>
                </div>
            );
        } else {
            return (
                <div className={classes.alert}>
                    <Alert severity="success">In stock!</Alert>
                </div>
            );
        }
    }

    //const comments = productDetail.binhLuans;

    const renderListComments = (comments) => {
        return comments.map((comment) => {
            return (
                <div className={classes.price} key={comment.maBl}>
                    <div>
                        <p>Mã Khách Hàng: {comment.maKhachHang} - {comment.thoiGian} </p>
                        <p> {comment.noiDungBinhLuan} </p>
                    </div>

                    <p>
                        <Button variant="outlined" color="error" fullWidth>X</Button>
                    </p>
                </div>
            );
        })
        
    }


    return (
        <>
            <Container className={classes.root}>
                <Box className={classes.productDetailHeader}>
                    <h2>Prodct Detail</h2>
                </Box>
                <Divider />
                <Paper className={classes.productDetailContent}>
                    <Grid container>
                        <Grid item md={7} xs={12} className={classes.productDetailCarousel}>
                            <CustomCarousel images={productIamge} />
                            <Divider orientation="vertical" flexItem style={{ height: "90%", margin: "auto" }} />
                        </Grid>
                        
                        <Grid item md={5} xs={12} className={classes.productDetailInfo}>
                            {renderQuantity(productDetail.soLuongCon)}
                            <h2>{productDetail.tenSp}</h2>
                            <StyledRating name="read-only" size="large" value={4} readOnly />
                                                       
                            <Divider className={classes.divider}/>
                            <div className={classes.category}>
                                <div className={classes.price}>
                                    <p>Category</p>
                                    <span>
                                        {renderCategory(productDetail.maDanhMuc)}
                                    </span>
                                </div>
                                <div className={classes.price}>
                                    <p>Price</p>
                                    <p style={{ color: "rgb(255, 72, 66)" }}>
                                        {parseInt(productDetail.donGia).toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND'
                                        })}
                                    </p>
                                </div>
                                
                                <div className={classes.price}>
                                    <p>Quantity </p>
                                    <p>
                                        {productDetail.soLuongCon}
                                    </p>
                                </div>
                                <div className={ classes.buttonGroup}>
                                    <Grid container>
                                        <Grid item sm={6} xs={12} className={classes.buttonContainer}>
                                            <Button variant="contained" fullWidth className={classes.buttonEdit}>Edit</Button>
                                        </Grid>
                                        <Grid item sm={6} xs={12} className={classes.buttonContainer}>
                                            <Button variant="outlined" color="error" className={classes.buttonDelete} fullWidth>Deltet</Button>
                                        </Grid>
                                    </Grid>
                                    
                                    
                                </div>
                            </div>
                            
                        </Grid>
                    </Grid>
                    

                </Paper>
                <Box className={classes.productDetailDiscription}>
                    <AppBar position="static" className={classes.appbar}>
                        Discription
                    </AppBar>
                    <p>{productDetail.moTa}</p>
                </Box>
                <Box className={classes.productDetailDiscription}>
                    <AppBar position="static" className={classes.appbar}>
                        Comments
                    </AppBar>
                    {productDetail.binhLuans != null ? renderListComments(productDetail.binhLuans):(<p>Hiện chưa có bình luận nào về sản phẩm.</p>)}
                </Box>

            </Container>
            
        </>
        );
}
export default ProductDetail;