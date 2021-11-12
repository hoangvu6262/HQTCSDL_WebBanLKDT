import axios from 'axios';
import {
    GET_USERS_PAGING_SUCCESS,
    GET_USERS_PAGING_FAIL,
    GET_USER_DETAIL_SUCCESS,
    GET_USER_DETAIL_FAIL,
    CUSTOMOR_LOGIN_SUCCESS,
    CUSTOMOR_LOGIN_FAIL,
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOGIN_FAIL,
    ADD_USER_SUCCESS,
    ADD_USER_FAIL,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    SEARCH_USER_SUCCESS,
    SEARCH_USER_FAIL,
    SET_ADMIN_ROLE_SUCCESS,
    SET_ADMIN_ROLE_FAIL,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL
} from "../constants/user.constant";
import action from './action';


// Get list user paging
export const GetAllUserPaging = (PageNumber, PageSize) => {
    return (dispatch) => {
        axios.get(`http://localhost:31051/api/KhachHang/GetCustomorsPagining?PageNumber=${PageNumber}&PageSize=${PageSize}`)
            .then((res) => {
                console.log(res.data);

                dispatch(action(GET_USERS_PAGING_SUCCESS, res.data))
            })
            .catch((err) => {
                console.log(err);
                dispatch(action(GET_USERS_PAGING_FAIL, err))
            })
    }
}

// Get user detail
export const GetUserDetail = (id) => {
    return (dispatch) => {
        axios.get(`http://localhost:31051/api/KhachHang/GetCustomorDetail/${id}`)
            .then((res) => {
                //console.log(res.data);

                dispatch(action(GET_USER_DETAIL_SUCCESS, res.data))
            })
            .catch((err) => {
                //console.log(err);
                dispatch(action(GET_USER_DETAIL_FAIL, err))
            })
    }
}

// Customor login
export const CustomorLogin = (data) => {
    return (dispatch) => {
        axios.post(`http://localhost:31051/api/KhachHang/CustomorLogin`, data)
            .then((res) => {
                //console.log(res.data);

                dispatch(action(CUSTOMOR_LOGIN_SUCCESS, res.data))
            })
            .catch((err) => {
                //console.log(err);
                dispatch(action(CUSTOMOR_LOGIN_FAIL, err))
            })
    }
}

// Admin login
export const AdminLogin = (data) => {
    return (dispatch) => {
        axios.post(`http://localhost:31051/api/KhachHang/AdminLogin`, data)
            .then((res) => {
                //console.log(res.data);
                localStorage.setItem("adminLogin", JSON.stringify(res.data))
                dispatch(action(ADMIN_LOGIN_SUCCESS, res.data))
            })
            .catch((err) => {
                //console.log(err.request.responseText);
                const notification = {
                    open: true,
                    severity: "error",
                    message: err.request.responseText,
                };
                dispatch(action(ADMIN_LOGIN_FAIL, notification))
            })
    }
}

// search user by name 
export const SearchUserByName = (name) => {
    return (dispatch) => {
        axios.get(`http://localhost:31051/api/KhachHang/SearchCustomorsByName?searchString=${name}`)
            .then((res) => {
                //console.log(res.data);

                dispatch(action(SEARCH_USER_SUCCESS, res.data))
            })
            .catch((err) => {
                //console.log(err);
                dispatch(action(SEARCH_USER_FAIL, err))
            })
    }
}

// Set admin role
export const SetAdminRole = (id) => {
    return (dispatch) => {
        axios.put(`http://localhost:31051/api/KhachHang/SetAdmin?maKhachHang=${id}`)
            .then((res) => {
                //console.log(res.data);
                //console.log(id);
                dispatch(action(SET_ADMIN_ROLE_SUCCESS, res.data))
            })
            .catch((err) => {
                //console.log(err);
                dispatch(action(SET_ADMIN_ROLE_FAIL, err))
            })
    }
}

// delete user
export const DeleteUser = (id) => {
    return (dispatch) => {
        axios.delete(`http://localhost:31051/api/KhachHang/DeleteCustomor/${id}`)
            .then((res) => {
                const notification = {
                    open: true,
                    severity: "success",
                    message: "Xóa khách hàng thành công!",
                };

                dispatch(action(DELETE_USER_SUCCESS, notification))
                dispatch(GetAllUserPaging(1,3))
            })
            .catch((err) => {
                const notification = {
                    open: true,
                    severity: "error",
                    message: "Xóa khách hàng không thành công!",
                };
                dispatch(action(DELETE_USER_FAIL, notification))
            })
    }
}

export const AddUser = (addData, openDialog, setOpenDialog) => {
    return (dispatch) => {
        axios.post(`http://localhost:31051/api/KhachHang/AddCustomor`, addData)
            .then((res) => {
                const notification = {
                    open: true,
                    severity: "success",
                    message: "Thêm user thành công",
                };
                setOpenDialog({ ...openDialog, open: false });
                dispatch(action(ADD_USER_SUCCESS, notification));
                dispatch(GetAllUserPaging(1, 3))
            })
            .catch((err) => {
                const notification = {
                    open: true,
                    severity: "error",
                    message: err.request.responseText,
                };
                dispatch(action(ADD_USER_FAIL, notification));
            })
    }
}

// Update user
export const UpdateUser = (id, data, openDialog, setOpenDialog) => {
    return (dispatch) => {
        axios.put(`http://localhost:31051/api/KhachHang/UpdateCustomor/${id}`, data)
            .then((res) => {
                //console.log(res.data);
                const notification = {
                    open: true,
                    severity: "success",
                    message: "Cập nhật user thành công",
                };
                setOpenDialog({ ...openDialog, open: false });
                dispatch(action(UPDATE_USER_SUCCESS, notification))
                dispatch(GetAllUserPaging(1, 3))
            })
            .catch((err) => {
                //console.log(err);
                const notification = {
                    open: true,
                    severity: "error",
                    message: err.request.responseText,
                }
                dispatch(action(UPDATE_USER_FAIL, notification))
            })
    }
}