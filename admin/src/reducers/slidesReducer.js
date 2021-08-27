import { ACTION_TYPES } from 'actionTypes';
const initialState = {
    slides: null,
    loading: true,
    error: null,
};

export default function slides(state = initialState, action) {
    switch (action.type) {
        case ACTION_TYPES.SET_SLIDES:
            return { ...state, slides: action.payload };
        case ACTION_TYPES.ERROR:
            return { ...state, error: action.payload };
        case ACTION_TYPES.SET_LOADING:
            return { ...state, loading: action.payload };

        default:
            return state;
    }
}
