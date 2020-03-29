export const NAMESPACE = 'siteMeta/index'

// state
const initialState = {
    authorInfo: {},
}

// action
const SET_AUTHOR_INFO = "SET_AUTHOR_INFO";

export const setAuthorInfo = authorInfo => ({
    type: SET_AUTHOR_INFO,
    payload: authorInfo,
});

// reducer
export const siteMetaReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_AUTHOR_INFO:
            return { ...state, authorInfo: payload }
        default:
            return state
    }
};
