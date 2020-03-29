export const NAMESPACE = 'allArticles/list'

// state
const initialState = {
    articles: [],
    articlesTags: [],
}

// action
const SET_ARTICLES = "SET_ARTICLES";

export const setArticles = articles => ({
    type: SET_ARTICLES,
    payload: articles,
});

// reducer
export const allArticlesReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_ARTICLES:
            return { ...state, articles: payload }
        default:
            return state
    }
};
