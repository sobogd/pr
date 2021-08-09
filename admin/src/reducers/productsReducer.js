import { ACTION_TYPES } from 'actionTypes';
const initialState = {
    products: null,
    loading: true,
    error: null,
};
export default function products(state = initialState, action) {
    switch (action.type) {
        case ACTION_TYPES.SET_PRODUCTS:
            return { ...state, products: action.payload };
        case ACTION_TYPES.ERROR:
            return { ...state, error: action.payload };
        case ACTION_TYPES.SET_LOADING:
            return { ...state, loading: action.payload };

        default:
            return state;
    }
}
