import React from "react";
import { Divider, Box, AppBar, IconButton, Typography } from '@mui/material';
import { makeStyles } from "@mui/styles";
import { styled } from '@mui/material/styles';
import Comment from "../../../components/Comment";
import { useDispatch } from "react-redux";
import { GetProductDetailById } from "../../../redux/actions/product.action";
import { AddComment } from "../../../redux/actions/comment.action";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

const CommentContainer = styled('div')({
    padding: 15,
    "& p": {
        padding: 0,
    }
})

const CommentTitle = styled('div')({
    display: "flex",
    justifyContent: "space-between",
    "& h6": {
        fontFamily: "'Urbanist', sans- serif !important",
        fontWeight: 600
    }

})

const useStyles = makeStyles({
    productDetailComment: {
        marginTop: 15,
        borderRadius: "0px !important",
        "& p": {
            padding: "20px",
            marginBottom: 0,
            fontSize: 15,
            fontWeight: 400,
            color: "rgb(33, 43, 54)",
            fontFamily: "'Urbanist', sans- serif !important",
        },
    },
    appbar: {
        padding: "10px 20px",
        backgroundColor: "rgb(244 246 248) !important",
        color: "rgb(33, 43, 54) !important",
        fontWeight: 600,
        fontFamily: "'Urbanist', sans- serif !important",
        boxShadow: "none !important",
    },
})

const ProductCommentContainer = ({ id, customor, productDetail }) => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const renderListComments = (comments) => {
        return comments.map((comment) => {
            return (
                <>
                    <CommentContainer key={comment.maBl}>
                        <CommentTitle>
                            <Typography variant="subtitle1" component="h6">
                                Mã Khách Hàng: {comment.maKhachHang} - {comment.thoiGian}
                            </Typography>
                            <IconButton>
                                <DeleteForeverOutlinedIcon />
                            </IconButton>
                        </CommentTitle>
                        <p> {comment.noiDungBinhLuan} </p>
                    </CommentContainer>
                    <Divider />
                </>

            );
        })

    }

    const handleAddComment = (noiDungBinhLuan, setAddComment) => {
        //console.log(customor);
        const comment = {
            maSp: id,
            maKhachHang: customor.id,
            noiDungBinhLuan: noiDungBinhLuan
        }
        //console.log(comment);
        dispatch(AddComment(comment, id, GetProductDetailById, setAddComment))
    }

    return (
        <>
            <Box className={classes.productDetailComment}>
                <AppBar position="static" className={classes.appbar}>
                    Comments
                    </AppBar>
                <Comment onClickAddComment={handleAddComment} />
                {productDetail.binhLuans.length > 0 ? renderListComments(productDetail.binhLuans) : (<p>No Comment.</p>)}
            </Box>
        </>
    )
}

export default ProductCommentContainer;