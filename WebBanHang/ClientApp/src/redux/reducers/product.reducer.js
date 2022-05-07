import {
    GET_ALL_PRODUCT_SUCCESS,
    GET_ALL_PRODUCT_FAIL,
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
    GET_PRODUCTS_BY_CATEGORY_FAIL,
    ADD_TO_CART_SUCCESS,
    MINUS_PRODUCT_QUANTITY_SUCCESS,
    ADD_PRODUCT_QUANTITY_SUCCESS,
    CART_REMOVE_PRODUCT_SUCCESS,
    GET_RELATED_PRODUCTS_SUCCESS,
    GET_RELATED_PRODUCTS_FAIL
} from "../constants/product.constant";

const initialState = {
    listAllProducts: [],
    listProductsPaging: [],
    listRelatedProducts: [],
    productDetail: {
        binhLuans: []
    },
    totalPage: 0,
    PageNumber: 0,
    notification: {},
    cart: {
        products: [],
        quantity: 0,
        total: 0,
    },
}


const ProductReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_ALL_PRODUCT_SUCCESS:
            return { ...state, listAllProducts: payload  }
        case GET_ALL_PRODUCT_FAIL:
            return { ...state }
        case GET_ALL_PRODUCT_PAGING_SUCCESS:
            return { ...state, listProductsPaging: payload.data, totalPage: payload.totalPages, PageNumber: payload.pageNumber }
        case GET_ALL_PRODUCT_PAGING_FAIL:
            return { ...state }
        case GET_RELATED_PRODUCTS_SUCCESS:
            return { ...state, listRelatedProducts: payload }
        case GET_RELATED_PRODUCTS_FAIL:
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
            //console.log(payload);
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
            return { ...state, listProductsPaging: payload, totalPage: 0 }
        case GET_PRODUCTS_BY_CATEGORY_FAIL:
            return { ...state }
        case UPDATE_PRODUCT_SUCCESS:
            return { ...state, notification: payload };
        case UPDATE_PRODUCT_FAIL:
            return { ...state, notification: payload };
        case ADD_TO_CART_SUCCESS: {
            const newState = { ...state };

            if (newState.cart.products.length > 0) {
                for (let i = 0; i < newState.cart.products.length; i++) {
                    if (newState.cart.products[i].maSp === payload.maSp) {
                        newState.cart.products[i].soLuong += payload.soLuong;
                        newState.cart.products[i].total += payload.total;
                        newState.cart.quantity += payload.soLuong;
                        newState.cart.total += payload.total;

                        return newState;
                    }
                };

                newState.cart.products.push(payload);
                newState.cart.quantity += payload.soLuong;
                newState.cart.total += payload.total;
                return newState;
            } else {
                newState.cart.products.push(payload);
                newState.cart.quantity += payload.soLuong;
                newState.cart.total += payload.total;
                return newState;
            }
            
        }
        case MINUS_PRODUCT_QUANTITY_SUCCESS: {
            const { index, donGia } = payload
            const minusState = { ...state };

            minusState.cart.products[index].soLuong -= 1;
            minusState.cart.products[index].total -= donGia;
            minusState.cart.quantity -= 1;
            minusState.cart.total -= donGia;
            return minusState
        }
        case ADD_PRODUCT_QUANTITY_SUCCESS: {
            const { index, donGia } = payload
            const addState = { ...state };

            addState.cart.products[index].soLuong += 1;
            addState.cart.products[index].total += donGia;
            addState.cart.quantity += 1;
            addState.cart.total += donGia;
            return addState
        }
        case CART_REMOVE_PRODUCT_SUCCESS: {
            const { index, total, soLuong } = payload;
            const removeState = { ...state };

            removeState.cart.products.splice(index, 1);
            removeState.cart.quantity -= soLuong;
            removeState.cart.total -= total;
            return removeState;
        }
        case "CUSTOMOR_LOGOUT":
            return {
                ...state,
                cart: {
                    products: [],
                    quantity: 0,
                    total: 0,
                }
            };

        default:
            return { ...state }
    }
}

export default ProductReducer;