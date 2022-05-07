import {
    GET_ALL_BILL_SUCCESS,
    GET_ALL_BILL_FAIL,
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

const initState = {
    listAllBills: [],
	listBillsPaging: [],
	billDetail: {},
	totalPage: 0,
	PageNumber: 0,
	notification: {}
}

const BillReducer = (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_ALL_BILL_SUCCESS:
            return { ...state, listAllBills: payload }
        case GET_ALL_BILL_FAIL:
            return { ...state }
        case GET_BILLS_PAGING_SUCCESS:
            return { ...state, listBillsPaging: payload.data, totalPage: payload.totalPages, PageNumber: payload.pageNumber }
        case GET_BILLS_PAGING_FAIL:
            return { ...state }
        case GET_BILL_DETAIL_SUCCESS:
            return { ...state, listBillsPaging: payload };
        case GET_BILL_DETAIL_FAIL:
            return { ...state }
        case DELETE_BILL_SUCCESS:
            return { ...state, notification: payload };
        case DELETE_BILL_FAIL:
            return { ...state, notification: payload };
        case "CLOSE_NOTIFICATION": {
            state.notification.open = payload;
            return { ...state };
        }
        case ADD_BILL_SUCCESS:
            return { ...state, notification: payload };
        case ADD_BILL_FAIL:
            return { ...state, notification: payload };
        case GET_BILLS_BY_STATUS_SUCCESS:
            return { ...state, listBillsPaging: payload }
        case GET_BILLS_BY_STATUS_FAIL:
            return { ...state }
        case PUT_CONFIRM_RECEIVED_SUCCESS:
            return { ...state, notification: payload };
        case PUT_CONFIRM_RECEIVED_FAIL:
            return { ...state, notification: payload };
        case PUT_CONFIRM_CANCELED_SUCCESS:
            return { ...state, notification: payload };
        case PUT_CONFIRM_CANCELED_FAIL:
            return { ...state, notification: payload };
        case PUT_AD_CONFIRM_SUCCESS:
            return { ...state, notification: payload };
        case PUT_AD_CONFIRM_FAIL:
            return { ...state, notification: payload };
        default:
            return { ...state }
    }
}

export default BillReducer;