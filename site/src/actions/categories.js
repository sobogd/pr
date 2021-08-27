import { ACTION_TYPES } from 'actionTypes';
import axios from 'axios';

export const setError = (error) => {
    return {
        type: ACTION_TYPES.ERROR,
        payload: error,
    };
};

export const setCategories = (data) => {
    return {
        type: ACTION_TYPES.SET_CATEGORIES,
        payload: data,
    };
};

export const setLoading = (loading) => {
    return {
        type: ACTION_TYPES.SET_LOADING,
        payload: loading,
    };
};

export const fetchCategories = (parent) => {
    return async (dispatch) => {
        await dispatch(setLoading(true));
        await axios
            .post('http://localhost:3001/categoriesList', { parent })
            .then(({ data }) => {
                dispatch(setCategories(data));
            })
            .catch((error) => {
                dispatch(setError(error));
            });
        return dispatch(setLoading(false));
    };
};

export const addCategory = (category) => {
    return async (dispatch) => {
        await dispatch(setLoading(true));
        await axios
            .post('http://localhost:3001/categories/add', JSON.stringify(category), {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(({ data }) => {
                data === 'ok' && dispatch(fetchCategories());
            })
            .catch((error) => {
                dispatch(setError(error));
            });
    };
};

export const removeCategory = (category) => {
    return async (dispatch) => {
        await dispatch(setLoading(true));
        await axios
            .post('http://localhost:3001/categories/remove', JSON.stringify(category), {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(({ data }) => {
                data === 'ok' && dispatch(fetchCategories());
            })
            .catch((error) => {
                dispatch(setError(error));
            });
    };
};

export const editCategory = (category) => {
    return async (dispatch) => {
        await dispatch(setLoading(true));
        await axios
            .post('http://localhost:3001/categories/edit', JSON.stringify(category), {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(({ data }) => {
                data === 'ok' && dispatch(fetchCategories());
            })
            .catch((error) => {
                dispatch(setError(error));
            });
    };
};
