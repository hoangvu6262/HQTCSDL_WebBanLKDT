import {
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAIL,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAIL
} from "../constants/comment.constant";

const initState = {
    notification: {},
}

const CommentReducer = (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case ADD_COMMENT_SUCCESS:
            return { ...state, notification: payload };
        case ADD_COMMENT_FAIL:
            return { ...state, notification: payload };
        case DELETE_COMMENT_SUCCESS:
            return { ...state, notification: payload };
        case DELETE_COMMENT_FAIL:
            return { ...state, notification: payload };
        case "CLOSE_NOTIFICATION": {
            state.notification.open = payload;
            return { ...state };
        }
        default:
            return { ...state }
    }
};

export default CommentReducer
