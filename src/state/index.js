import { combineReducers } from "redux"
import app from "./app"
import { NAMESPACE as _allArticles, allArticlesReducer } from './allArticles';
import { NAMESPACE as _siteMeta, siteMetaReducer } from './siteMeta';

export default combineReducers({
    app,
    _allArticles: allArticlesReducer,
    _siteMeta: siteMetaReducer,
})
