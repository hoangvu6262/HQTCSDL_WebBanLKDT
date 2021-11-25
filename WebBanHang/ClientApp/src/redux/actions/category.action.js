import axios from "axios";
import {
    GET_LIST_CATEGORY_SUCCESS,
    GET_LIST_CATEGORY_FAILD,
    ADD_CATEGORY_sUCCESS,
    ADD_CATEGORY_FAIL
} from "../constants/category.constant";
import action from "./action";

export const GetListCategory = () => {
    return (dispatch) => {
        axios.get("http://localhost:31051/api/DanhMuc/GetAllCategories")
            .then((res) => {
                //console.log(res.data);
                dispatch(action(GET_LIST_CATEGORY_SUCCESS, res.data))
            })
            .catch((err) => {
                dispatch(action(GET_LIST_CATEGORY_FAILD, err))
            })
    }
}


export const AddCategory = (addData, openDialog, setOpenDialog) => {
    return (dispatch) => {
        axios.post("http://localhost:31051/api/DanhMuc/AddCategory", addData)
            .then((res) => {
                //console.log(res.data);
                const notification = {
                    open: true,
                    severity: "success",
                    message: "Thêm danh mục thành công!",
                };
                dispatch(action(ADD_CATEGORY_sUCCESS, notification));
                setOpenDialog({ ...openDialog, open: false })
                dispatch(GetListCategory())
            })
            .catch((err) => {
                const notification = {
                    open: true,
                    severity: "error",
                    message: "Thêm danh mục không thành công!",
                };
                dispatch(action(ADD_CATEGORY_FAIL, notification))
            })
    }
}