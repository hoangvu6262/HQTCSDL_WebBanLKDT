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

const initialState = {
    listProductsPaging: [],
    productDetail: {},
    totalPage: 0,
    PageNumber: 0,
    notification: {}
}

const ProductReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_ALL_PRODUCT_PAGING_SUCCESS:
            return { ...state, listProductsPaging: payload.data, totalPage: payload.totalPages, PageNumber: payload.pageNumber }
        case GET_ALL_PRODUCT_PAGING_FAIL:
            return { ...state }
        case SEARCH_PRODUCTS_BY_NAME_SUCCESS:
            return { ...state, listProductsPaging: payload, totalPage: 0 }
        case SEARCH_PRODUCTS_BY_NAME_FAIL:
            return { ...state }
        case GET_PRODUCT_DETAIL_SUCCESS:
            return { ...state, productDetail: payload };
        case GET_PRODUCT_DETAIL_FAIL:
            return { ...state }
        case DELETE_PRODUCT_SUCCESS:
            console.log(payload);
            return { ...state, notification: payload };
        case DELETE_PRODUCT_FAIL:
            return { ...state, notification: payload };
        case "CLOSE_NOTIFICATION": {
            state.notification.open = payload;
            return { ...state };
        }
        case ADD_PRODUCT_SUCCESS:
            return { ...state, notification: payload };
        case ADD_PRODUCT_FAIL:
            return { ...state, notification: payload };
        case GET_PRODUCTS_BY_CATEGORY_SUCCESS:
            return { ...state, listProductsPaging: payload }
        case GET_PRODUCTS_BY_CATEGORY_FAIL:
            return { ...state }
        case UPDATE_PRODUCT_SUCCESS:
            return { ...state, notification: payload };
        case UPDATE_PRODUCT_FAIL:
            return { ...state, notification: payload };
        default:
            return { ...state }
    }
}

export default ProductReducer;