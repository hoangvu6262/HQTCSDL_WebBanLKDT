import {
    GET_NEWS_LIST_SUCCESS,
    GET_NEWS_LIST_FAIL,
    GET_NEWS_BY_ID_SUCCESS,
    GET_NEWS_BY_ID_FAIL,
    SEARCH_NEWS_BY_TITLE_SUCCESS,
    SEARCH_NEWS_BY_TITLE_FAIL,
    ADD_NEWS_SUCCESS,
    ADD_NEWS_FAIL,
    DELETE_NEWS_SUCCESS,
    DELETE_NEWS_FAIL,
    UPDATE_NEWS_SUCCESS,
    UPDATE_NEWS_FAIL
} from "../constants/news.constant";

const initialState = {
    listNews: [],
    newsDetail: {},
    notification: {}
}

const NewsReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_NEWS_LIST_SUCCESS:
            return { ...state, listNews: payload}
        case GET_NEWS_LIST_FAIL:
            return { ...state }
        case SEARCH_NEWS_BY_TITLE_SUCCESS:
            return { ...state, listNews: payload }
        case SEARCH_NEWS_BY_TITLE_FAIL:
            return { ...state }
        case GET_NEWS_BY_ID_SUCCESS:
            return { ...state, newsDetail: payload };
        case GET_NEWS_BY_ID_FAIL:
            return { ...state }
        case DELETE_NEWS_SUCCESS:
            console.log(payload);
            return { ...state, notification: payload };
        case DELETE_NEWS_FAIL:
            return { ...state, notification: payload };
        case "CLOSE_NOTIFICATION": {
            state.notification.open = payload;
            return { ...state };
        }
        case ADD_NEWS_SUCCESS:
            return { ...state, notification: payload };
        case ADD_NEWS_FAIL:
            return { ...state, notification: payload };
        case UPDATE_NEWS_SUCCESS:
            return { ...state, notification: payload };
        case UPDATE_NEWS_FAIL:
            return { ...state, notification: payload };
        default:
            return { ...state }
    }
}

export default NewsReducer;