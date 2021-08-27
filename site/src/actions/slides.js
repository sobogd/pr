import { ACTION_TYPES } from 'actionTypes';
import axios from 'axios';

export const setError = (error) => {
    return {
        type: ACTION_TYPES.ERROR,
        payload: error,
    };
};

export const setSlides = (data) => {
    return {
        type: ACTION_TYPES.SET_SLIDES,
        payload: data,
    };
};

export const setLoading = (loading) => {
    return {
        type: ACTION_TYPES.SET_LOADING,
        payload: loading,
    };
};

export const fetchSlides = () => {
    return async (dispatch) => {
        await dispatch(setLoading(true));
        await axios
            .post('http://localhost:3001/slides/list')
            .then(({ data }) => {
                dispatch(setSlides(data));
            })
            .catch((error) => {
                dispatch(setError(error));
            });
        return dispatch(setLoading(false));
    };
};

export const addSlide = (slide) => {
    return async (dispatch) => {
        await dispatch(setLoading(true));
        await axios
            .post('http://localhost:3001/slides/add', JSON.stringify(slide), {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(({ data }) => {
                data === 'ok' && dispatch(fetchSlides());
            })
            .catch((error) => {
                dispatch(setError(error));
            });
    };
};

export const removeSlide = (slide) => {
    return async (dispatch) => {
        await dispatch(setLoading(true));
        await axios
            .post('http://localhost:3001/slides/remove', JSON.stringify(slide), {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(({ data }) => {
                data === 'ok' && dispatch(fetchSlides());
            })
            .catch((error) => {
                dispatch(setError(error));
            });
    };
};

export const editSlide = (slide) => {
    return async (dispatch) => {
        await dispatch(setLoading(true));
        await axios
            .post('http://localhost:3001/slides/edit', JSON.stringify(slide), {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(({ data }) => {
                data === 'ok' && dispatch(fetchSlides());
            })
            .catch((error) => {
                dispatch(setError(error));
            });
    };
};
