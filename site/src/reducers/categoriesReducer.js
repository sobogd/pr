import { ACTION_TYPES } from 'actionTypes';
const initialState = {
    list: [],
    loading: true,
    error: null,
};

export default function categories(state = initialState, action) {
    switch (action.type) {
        case ACTION_TYPES.SET_CATEGORIES:
            return { ...state, list: action.payload };
        case ACTION_TYPES.ERROR:
            return { ...state, error: action.payload };
        case ACTION_TYPES.SET_LOADING:
            return { ...state, loading: action.payload };

        default:
            return state;
    }
}
