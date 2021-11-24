import axios from "axios";
import { GET_LIST_CATEGORY_SUCCESS, GET_LIST_CATEGORY_FAILD } from "../constants/category.constant";
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