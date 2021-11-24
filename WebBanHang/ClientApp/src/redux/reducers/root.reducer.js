import { combineReducers } from "redux";
import UserReducer from "./user.reducer";
import ProductReducer from "./product.reducer";
import CategoryReducer from "./category.reducer"
import BillReducer from "./bill.reducer";
import NewsReducer from "./news.reducer";
import CommentReducer from "./comment.reducer"

const rootReducer = combineReducers({
    user: UserReducer,
    product: ProductReducer,
    category: CategoryReducer,
    bill: BillReducer,
    news: NewsReducer,
    comment: CommentReducer
});

export default rootReducer;
