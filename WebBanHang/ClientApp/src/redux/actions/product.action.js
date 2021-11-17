import axios from 'axios';
import action from './action';
import {
    GET_ALL_PRODUCT_PAGING_SUCCESS,
    GET_ALL_PRODUCT_PAGING_FAIL,
    SEARCH_PRODUCTS_BY_NAME_SUCCESS,
    SEARCH_PRODUCTS_BY_NAME_FAIL,
    GET_PRODUCT_DETAIL_SUCCESS,
    GET_PRODUCT_DETAIL_FAIL,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAIL,
    GET_PRODUCTS_BY_CATEGORY_SUCCESS,
    GET_PRODUCTS_BY_CATEGORY_FAIL
} from "../constants/product.constant";


// lấy danh sách sản phâm có phân trang
export const GetAllProductPaging = (pageNumber, PageSize) => {
    return (dispatch) => {
        axios.get(`http://localhost:31051/api/SanPham/GetProductsPagining?PageNumber=${pageNumber}&PageSize=${PageSize}`)
            .then((res) => {
                //console.log(res.data);
                dispatch(action(GET_ALL_PRODUCT_PAGING_SUCCESS, res.data));
            })
            .catch((err) => {
                dispatch(action(GET_ALL_PRODUCT_PAGING_FAIL, err));
            })
    }
}

// tìm kiếm sản phẩm
export const SearchProductsByName = (productName) => {
    return (dispatch) => {
        axios.get(`http://localhost:31051/api/SanPham/SearchProductsByName?searchString=${productName}`)
            .then((res) => {
                //console.log("search: ", res.data);
                dispatch(action(SEARCH_PRODUCTS_BY_NAME_SUCCESS, res.data));
            })
            .catch((err) => {
                dispatch(action(SEARCH_PRODUCTS_BY_NAME_FAIL, err));
            })
    }
}

// get product detail by maSp
export const GetProductDetailById = (id) => {
    return (dispatch) => {
        axios.get(`http://localhost:31051/api/SanPham/GetProductsDetail/${id}`)
            .then((res) => {
                console.log("data: ", res.data);
                dispatch(action(GET_PRODUCT_DETAIL_SUCCESS, res.data));
            })
            .catch((err) => {
                dispatch(action(GET_PRODUCT_DETAIL_FAIL, err));
            })
    }
}


//delete product
export const DeleteProduct = (id) => {
    return (dispatch) => {
        axios.delete(`http://localhost:31051/api/SanPham/DeleteProduct/${id}`)
            .then((res) => {
                const notification = {
                    open: true,
                    severity: "success",
                    message: "Xóa sản phẩm thành công!",
                };
                dispatch(action(DELETE_PRODUCT_SUCCESS, notification));
                dispatch(GetAllProductPaging(1,5))
            })
            .catch((err) => {
                const notification = {
                    open: true,
                    severity: "error",
                    message: "Xóa sản phẩm không thành công!",
                };
                dispatch(action(DELETE_PRODUCT_FAIL, notification));
            })
    }
}

//update product
export const UpdateProduct = (id, updateData, history) => {
    return (dispatch) => {
        axios.put(`http://localhost:31051/api/SanPham/UpdateProduct/${id}`, updateData)
            .then((res) => {
                const notification = {
                    open: true,
                    severity: "success",
                    message: "Cập nhật thành công",
                };
                dispatch(action(UPDATE_PRODUCT_SUCCESS, notification));
                history.goBack();
            })
            .catch((err) => {
                console.log(err.request);
                const notification = {
                    open: true,
                    severity: "error",
                    message: "updata khong thanh cong",
                };
                dispatch(action(UPDATE_PRODUCT_FAIL, notification));
            })
    }
}

//add product
export const AddProduct = (addData, openDialog, setOpenDialog) => {
    return (dispatch) => {
        axios.post(`http://localhost:31051/api/SanPham/AddProduct`, addData)
            .then((res) => {
                const notification = {
                    open: true,
                    severity: "success",
                    message: "Thêm sản phẩm thành công",
                };
                setOpenDialog({ ...openDialog, open: false });
                dispatch(action(ADD_PRODUCT_SUCCESS, notification));
                dispatch(GetAllProductPaging(1, 5))
            })
            .catch((err) => {
                const notification = {
                    open: true,
                    severity: "error",
                    message: err.request.responseText,
                };
                dispatch(action(ADD_PRODUCT_FAIL, notification));
            })
    }
}


//get products list By category
export const GetProductByCategory = (categoryId) => {
    return (dispatch) => {
        axios.get(`http://localhost:31051/api/SanPham/GetProductsByCatagory?categoryID=${categoryId}`,)
            .then((res) => {

                dispatch(action(GET_PRODUCTS_BY_CATEGORY_SUCCESS, res.data));
            })
            .catch((err) => {
                dispatch(action(GET_PRODUCTS_BY_CATEGORY_FAIL, err));
            })
    }
}