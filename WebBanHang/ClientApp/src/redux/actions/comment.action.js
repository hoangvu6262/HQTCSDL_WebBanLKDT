import {
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAIL,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAIL
} from "../constants/comment.constant";
import axios from "axios";
import action from "./action";


// add comment
export const AddComment = (comment, id, GetProductDetailById, setAddComment) => {
    return (dispatch) => {
        axios.post('http://localhost:31051/api/BinhLuan/AddComment', comment)
            .then(res => {
                const notification = {
                    open: true,
                    severity: "success",
                    message: "Add comment success",
                };
                dispatch(action(ADD_COMMENT_SUCCESS, notification))
                dispatch(GetProductDetailById(id))
                setAddComment('');
            })
            .catch(err => {
                const notification = {
                    open: true,
                    severity: "error",
                    message: "Add comment error",
                };
                dispatch(action(ADD_COMMENT_FAIL, notification))
            })
    }
}


// add comment
export const DeleteComment = (id) => {
    return (dispatch) => {
        axios.post(`http://localhost:31051/api/KhachHang/DeleteComment/${id}`)
            .then(res => {
                const notification = {
                    open: true,
                    severity: "success",
                    message: "Delete comment success",
                };
                dispatch(action(DELETE_COMMENT_SUCCESS, notification))
            })
            .catch(err => {
                const notification = {
                    open: true,
                    severity: "error",
                    message: "Delete comment error",
                };
                dispatch(action(DELETE_COMMENT_FAIL, notification))
            })
    }
}