import axios from "axios";
import action from "./action";
import {
	GET_BILLS_PAGING_SUCCESS,
	GET_BILLS_PAGING_FAIL,
	GET_BILL_DETAIL_SUCCESS,
	GET_BILL_DETAIL_FAIL,
	ADD_BILL_SUCCESS,
	ADD_BILL_FAIL,
	ADD_BILL_DETAIL_SUCCESS,
	ADD_BILL_DETAIL_FAIL,
	UPDATE_BILL_SUCCESS,
	UPDATE_BILL_FAIL,
	DELETE_BILL_SUCCESS,
	DELETE_BILL_FAIL,
	PUT_CONFIRM_RECEIVED_SUCCESS,
	PUT_CONFIRM_RECEIVED_FAIL,
	PUT_CONFIRM_CANCELED_SUCCESS,
	PUT_CONFIRM_CANCELED_FAIL,
	PUT_AD_CONFIRM_SUCCESS,
	PUT_AD_CONFIRM_FAIL,
	GET_BILLS_BY_STATUS_SUCCESS,
	GET_BILLS_BY_STATUS_FAIL
} from "../constants/Bill.constant";


// get list bills paging
export const GetBillsPaging = (pageNumber, PageSize) => {
    return (dispatch) => {
        axios.get(`http://localhost:31051/api/HoaDon/GetBillPaging?PageNumber=${pageNumber}&PageSize=${PageSize}`)
            .then((res) => {
                dispatch(action(GET_BILLS_PAGING_SUCCESS, res.data));
            })
            .catch((err) => {
                dispatch(action(GET_BILLS_PAGING_FAIL, err));
            })
    }
}


// get bill detail by id
export const GetBillDetailById = (id) => {
    return (dispatch) => {
        axios.get(`http://localhost:31051/api/HoaDon/GetBillDetail/${id}`)
            .then((res) => {
                dispatch(action(GET_BILL_DETAIL_SUCCESS, res.data));
            })
            .catch((err) => {
                dispatch(action(GET_BILL_DETAIL_FAIL, err));
            })
    }
}


//delete bill
export const DeleteBill = (id) => {
    return (dispatch) => {
        axios.delete(`http://localhost:31051/api/HoaDon/DeleteBill/${id}`)
            .then((res) => {
                const notification = {
                    open: true,
                    severity: "success",
                    message: "Xóa hóa đơn thành công!",
                };
                dispatch(action(DELETE_BILL_SUCCESS, notification));
                dispatch(GetBillsPaging(1, 5))
            })
            .catch((err) => {
                const notification = {
                    open: true,
                    severity: "error",
                    message: "Xóa hóa đơn không thành công!",
                };
                dispatch(action(DELETE_BILL_FAIL, notification));
            })
    }
}

//Put Confirm Received
export const PutConfirmReceived = (id) => {
    return (dispatch) => {
        axios.put(`http://localhost:31051/api/HoaDon/PutConfirmReceived/${id}`)
            .then((res) => {
                const notification = {
                    open: true,
                    severity: "success",
                    message: "Cập nhật thành công",
                };
                dispatch(action(PUT_CONFIRM_RECEIVED_SUCCESS, notification));
                dispatch(GetBillsPaging(1, 5))
            })
            .catch((err) => {
                console.log(err.request);
                const notification = {
                    open: true,
                    severity: "error",
                    message: "cap nhat khong thanh cong",
                };
                dispatch(action(PUT_CONFIRM_RECEIVED_FAIL, notification));
            })
    }
}

//Put Confirm Canceled
export const PutConfirmCanceled = (id) => {
    return (dispatch) => {
        axios.put(`http://localhost:31051/api/HoaDon/PutConfirmCanceled/${id}`)
            .then((res) => {
                const notification = {
                    open: true,
                    severity: "success",
                    message: "Cập nhật thành công",
                };
                dispatch(action(PUT_CONFIRM_CANCELED_SUCCESS, notification));
                dispatch(GetBillsPaging(1, 5))
            })
            .catch((err) => {
                console.log(err.request);
                const notification = {
                    open: true,
                    severity: "error",
                    message: "cap nhat khong thanh cong",
                };
                dispatch(action(PUT_CONFIRM_CANCELED_FAIL, notification));
            })
    }
}

//Put ad Confirm 
export const PutAdConfirm = (id) => {
    return (dispatch) => {
        axios.put(`http://localhost:31051/api/HoaDon/PutAdConfirm/${id}`)
            .then((res) => {
                const notification = {
                    open: true,
                    severity: "success",
                    message: "Cập nhật thành công",
                };
                dispatch(action(PUT_AD_CONFIRM_SUCCESS, notification));
                dispatch(GetBillsPaging(1, 5))
            })
            .catch((err) => {
                console.log(err.request);
                const notification = {
                    open: true,
                    severity: "error",
                    message: "cap nhat khong thanh cong",
                };
                dispatch(action(PUT_AD_CONFIRM_FAIL, notification));
            })
    }
}

//add Bill
export const AddBill = (addData, openDialog, setOpenDialog) => {
    return (dispatch) => {
        axios.post(`http://localhost:31051/api/SanPham/AddProduct`, addData)
            .then((res) => {
                const notification = {
                    open: true,
                    severity: "success",
                    message: "Thêm hóa đơn thành công",
                };
                setOpenDialog({ ...openDialog, open: false });
                dispatch(action(ADD_BILL_SUCCESS, notification));
                dispatch(GetBillsPaging(1, 5))
            })
            .catch((err) => {
                const notification = {
                    open: true,
                    severity: "error",
                    message: err.request.responseText,
                };
                dispatch(action(ADD_BILL_FAIL, notification));
            })
    }
}


//get bills list By status
export const GetBillByStatus = (Id) => {
    return (dispatch) => {
        axios.get(`http://localhost:31051/api/HoaDon/GetBillByStatus?status=${Id}`)
            .then((res) => {

                dispatch(action(GET_BILLS_BY_STATUS_SUCCESS, res.data));
            })
            .catch((err) => {
                dispatch(action(GET_BILLS_BY_STATUS_FAIL, err));
            })
    }
}