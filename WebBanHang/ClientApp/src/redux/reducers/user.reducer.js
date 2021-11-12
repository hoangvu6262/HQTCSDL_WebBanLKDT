﻿import {
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


const intialState = {
    listUsersPaging: [],
    userDetail: {},
    totalPage: 0,
    PageNumber: 0,
    notification: {},
    isAdminLogin: false,
}

const UserReducer = (state = intialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_USERS_PAGING_SUCCESS:
            return { ...state, listUsersPaging: payload.data, totalPage: payload.totalPages, PageNumber: payload.pageNumber }
        case GET_USERS_PAGING_FAIL:
            return { ...state }
        case SEARCH_USER_SUCCESS:
            return { ...state, listUsersPaging: payload, totalPage: 0 }
        case SEARCH_USER_FAIL:
            return { ...state }
        case GET_USER_DETAIL_SUCCESS:
            return { ...state, userDetail: payload };
        case GET_USER_DETAIL_FAIL:
            return { ...state }
        case DELETE_USER_SUCCESS:
            console.log(payload);
            return { ...state, notification: payload };
        case DELETE_USER_FAIL:
            return { ...state, notification: payload };
        case "CLOSE_NOTIFICATION": {
            state.notification.open = payload;
            return { ...state };
        }
        case ADMIN_LOGIN_SUCCESS:
            return { ...state, isAdminLogin: true};
        case ADMIN_LOGIN_FAIL:
            console.log(payload)
            return { ...state, notification: payload };
        case "ADMIN_LOGIN_AUTO":
            return { ...state, isAdminLogin: payload };
        case "ADMIN_LOGOUT":
            return { ...state, isAdminLogin: payload };
        case ADD_USER_SUCCESS:
            return { ...state, notification: payload };
        case ADD_USER_FAIL:
            return { ...state, notification: payload };
        case UPDATE_USER_SUCCESS:
            return { ...state, notification: payload };
        case UPDATE_USER_FAIL:
            return { ...state, notification: payload };
        case SET_ADMIN_ROLE_SUCCESS:
            return { ...state };
        case SET_ADMIN_ROLE_FAIL:
            return { ...state};
        default:
            return { ...state }
    }
};

export default UserReducer
