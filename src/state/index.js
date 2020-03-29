import { combineReducers } from "redux"
import app from "./app"
import { NAMESPACE as _allArticles, allArticlesReducer } from './allArticles';

export default combineReducers({
    app,
    _allArticles: allArticlesReducer,
})
