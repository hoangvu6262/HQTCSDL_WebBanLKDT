import { GET_LIST_CATEGORY_SUCCESS, GET_LIST_CATEGORY_FAILD } from "../constants/category.constant";

const intialState = {
    listCategory: [],
}

const CategoryReducer = (state = intialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_LIST_CATEGORY_SUCCESS:
            return { ...state, listCategory: payload };
        case GET_LIST_CATEGORY_FAILD:
            return { ...state };
        default:
            return { ...state };
    }
}

export default CategoryReducer;