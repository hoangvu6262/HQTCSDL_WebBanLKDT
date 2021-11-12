import axios from "axios";
import action from "./action";
import {
    GET_NEWS_LIST_SUCCESS,
    GET_NEWS_LIST_FAIL,
    GET_NEWS_BY_ID_SUCCESS,
    GET_NEWS_BY_ID_FAIL,
    SEARCH_NEWS_BY_TITLE_SUCCESS,
    SEARCH_NEWS_BY_TITLE_FAIL,
    ADD_NEWS_SUCCESS,
    ADD_NEWS_FAIL,
    DELETE_NEWS_SUCCESS,
    DELETE_NEWS_FAIL,
    UPDATE_NEWS_SUCCESS,
    UPDATE_NEWS_FAIL
} from "../constants/news.constant";



// get news list 
export const GetNewsList = () => {
    return (dispatch) => {
        axios.get(`http://localhost:31051/api/TinTuc/GetNewsList`)
            .then((res) => {
                dispatch(action(GET_NEWS_LIST_SUCCESS, res.data));
            })
            .catch((err) => {
                dispatch(action(GET_NEWS_LIST_FAIL, err));
            })
    }
}

// search news by title
export const SearchNewssByTitle = (tittle) => {
    return (dispatch) => {
        axios.get(`http://localhost:31051/api/tintuc/GetNewsByTitle?searchString=${tittle}`)
            .then((res) => {
                //console.log("search: ", res.data);
                dispatch(action(SEARCH_NEWS_BY_TITLE_SUCCESS, res.data));
            })
            .catch((err) => {
                dispatch(action(SEARCH_NEWS_BY_TITLE_FAIL, err));
            })
    }
}

// get news by id
export const GetNewsById = (id) => {
    return (dispatch) => {
        axios.get(`http://localhost:31051/api/TinTuc/GetNewsById/${id}`)
            .then((res) => {
                console.log("data: ", res.data);
                dispatch(action(GET_NEWS_BY_ID_SUCCESS, res.data));
            })
            .catch((err) => {
                dispatch(action(GET_NEWS_BY_ID_FAIL, err));
            })
    }
}


//delete news
export const DeleteProduct = (id) => {
    return (dispatch) => {
        axios.delete(`http://localhost:31051/api/TinTuc/DeleteNews/${id}`)
            .then((res) => {
                const notification = {
                    open: true,
                    severity: "success",
                    message: "Xóa tin tuc thành công!",
                };
                dispatch(action(DELETE_NEWS_SUCCESS, notification));
                dispatch(GetNewsList())
            })
            .catch((err) => {
                const notification = {
                    open: true,
                    severity: "error",
                    message: "Xóa tin tuc không thành công!",
                };
                dispatch(action(DELETE_NEWS_FAIL, notification));
            })
    }
}

//update news
export const UpdateNews = (id, updateData, history) => {
    return (dispatch) => {
        axios.put(`http://localhost:31051/api/TinTuc/UpdateNews/${id}`, updateData)
            .then((res) => {
                const notification = {
                    open: true,
                    severity: "success",
                    message: "Cập nhật thành công",
                };
                dispatch(action(UPDATE_NEWS_SUCCESS, notification));
                history.goBack();
            })
            .catch((err) => {
                const notification = {
                    open: true,
                    severity: "error",
                    message: "Cap nhat khong thanh cong",
                };
                dispatch(action(UPDATE_NEWS_FAIL, notification));
            })
    }
}

//add news
export const AddNews = (addData, openDialog, setOpenDialog) => {
    return (dispatch) => {
        axios.post(`http://localhost:31051/api/TinTuc/AddNews`, addData)
            .then((res) => {
                const notification = {
                    open: true,
                    severity: "success",
                    message: "Thêm Tin tuc thành công",
                };
                setOpenDialog({ ...openDialog, open: false });
                dispatch(action(ADD_NEWS_SUCCESS, notification));
                dispatch(GetNewsList())
            })
            .catch((err) => {
                const notification = {
                    open: true,
                    severity: "error",
                    message: err.request.responseText,
                };
                dispatch(action(ADD_NEWS_FAIL, notification));
            })
    }
}


