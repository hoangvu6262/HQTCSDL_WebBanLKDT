import React, { useEffect} from "react";
import { Divider, Box, AppBar, Typography, Avatar } from '@mui/material';
import { makeStyles } from "@mui/styles";
import { styled } from '@mui/material/styles';
import Comment from "../../../components/Comment";
import { useDispatch } from "react-redux";
import { GetProductDetailById } from "../../../redux/actions/product.action";
import { AddComment } from "../../../redux/actions/comment.action";
import { GetAllUser } from "../../../redux/actions/user.action"
import { useSelector } from "react-redux"


const CommentContainer = styled('div')({
    display: "flex",
    width: "100%",
    padding: 15,
    "& p": {
        padding: 0,
    }
})

const CommentTitle = styled('div')({
    //marginLeft: 25,
    display: "flex",
    justifyContent: "space-between",
    "& h6": {
        fontSize: 14,
        //fontFamily: "'Urbanist', sans- serif !important",
        fontWeight: 400,
        "& span": {
            fontWeight: 200,
            fontSize: 11
        }
    }

})

const useStyles = makeStyles({
    productDetailComment: {
        marginTop: 15,
        borderRadius: "0px !important",
        "& p": {
            padding: "0px 20px 20px 0px",
            marginBottom: 0,
            fontSize: 15,
            fontWeight: 400,
            color: "rgb(33, 43, 54)",
            //fontFamily: "'Urbanist', sans- serif !important",
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
    imageAcountComment: {
        marginRight: 25
    }

})

const ProductCommentContainer = ({ id, customor, productDetail }) => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const { listAllUsers } = useSelector(state => state.user)


    useEffect(() => {
        dispatch(GetAllUser());
    }, [])


    const rederUserComment = (id) => {
        let index = 0;
        for (let i = 0; i < listAllUsers.length; i++) {
            if (listAllUsers[i].maKhachHang === id) {
                index = i
            }
        }
        const userComment = {
            account: listAllUsers[index].tenDangNhap,
            image: listAllUsers[index].anhDaiDien
        }

        return userComment
    }


    const renderTimeComment = (time) => {
        return time.split("T")[0];
    }

    const renderListComments = (comments) => {
        return comments.map((comment) => {
            return (
                <>
                    <CommentContainer key={comment.maBl}>
                        <div className={classes.imageAcountComment}>
                            <Avatar alt={rederUserComment(comment.maKhachHang).account} src={rederUserComment(comment.maKhachHang).image} />
                            
                        </div>
                        <div>
                            <CommentTitle>
                                <Typography variant="subtitle1" component="h6">
                                    {rederUserComment(comment.maKhachHang).account} - <span>{renderTimeComment(comment.thoiGian)}</span>
                                </Typography>

                            </CommentTitle>
                            <p> {comment.noiDungBinhLuan} </p>
                        </div>
                        
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
                    Bình luận
                    </AppBar>
                <Comment onClickAddComment={handleAddComment} />
                <p>{productDetail.binhLuans.length} Comments</p>
                <Divider />
                {productDetail.binhLuans.length > 0 ? renderListComments(productDetail.binhLuans) : (<p>No Comment.</p>)}
            </Box>
        </>
    )
}

export default ProductCommentContainer;