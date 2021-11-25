import {
    GET_LIST_CATEGORY_SUCCESS,
    GET_LIST_CATEGORY_FAILD,
    ADD_CATEGORY_sUCCESS,
    ADD_CATEGORY_FAIL
} from "../constants/category.constant";

const intialState = {
    listCategory: [],
    notificationCategory: {},

}

const CategoryReducer = (state = intialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_LIST_CATEGORY_SUCCESS:
            return { ...state, listCategory: payload };
        case GET_LIST_CATEGORY_FAILD:
            return { ...state };
        case ADD_CATEGORY_sUCCESS:
            return { ...state, notificationCategory: payload };
        case ADD_CATEGORY_FAIL:
            return { ...state, notificationCategory: payload };
        case "CLOSE_NOTIFICATION": {
            state.notificationCategory.open = payload;
            return { ...state };
        }
        default:
            return { ...state };
    }
}

export default CategoryReducer;