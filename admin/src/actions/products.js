import { ACTION_TYPES } from "actionTypes";
import axios from "axios";

export const setError = (error) => {
  return {
    type: ACTION_TYPES.ERROR,
    payload: error,
  };
};

export const setProducts = (data) => {
  return {
    type: ACTION_TYPES.SET_PRODUCTS,
    payload: data,
  };
};

export const setLoading = (loading) => {
  return {
    type: ACTION_TYPES.SET_LOADING,
    payload: loading,
  };
};

export const loadPrductFromAli = (data) => {
  return {
    type: ACTION_TYPES.GET_FROM_ALI,
    payload: data,
  };
};

export const fetchProducts = () => {
  return async (dispatch) => {
    await dispatch(setLoading(true));
    await axios
      .post("http://localhost:3001/products/list")
      .then(({ data }) => {
        dispatch(setProducts(data));
      })
      .catch((error) => {
        dispatch(setError(error));
      });
    return dispatch(setLoading(false));
  };
};

export const addProduct = (product) => {
  return async (dispatch) => {
    await dispatch(setLoading(true));
    await axios
      .post("/api/products/add", JSON.stringify(product), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(({ data }) => {
        data === "ok" && dispatch(fetchProducts());
      })
      .catch((error) => {
        dispatch(setError(error));
      });
  };
};

export const removeProduct = (product) => {
  return async (dispatch) => {
    await dispatch(setLoading(true));
    await axios
      .post("/api/products/remove", JSON.stringify(product), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(({ data }) => {
        data === "ok" && dispatch(fetchProducts());
      })
      .catch((error) => {
        dispatch(setError(error));
      });
  };
};

export const editProduct = (product) => {
  return async (dispatch) => {
    await dispatch(setLoading(true));
    await axios
      .post("/api/products/edit", JSON.stringify(product), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(({ data }) => {
        data === "ok" && dispatch(fetchProducts());
      })
      .catch((error) => {
        dispatch(setError(error));
      });
  };
};

export const getFromAli = (linkAli) => {
  return async (dispatch) => {
    await dispatch(setLoading(true));
    await axios
      .post("/api/products/ali", JSON.stringify({ linkAli }), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(async ({ data }) => {
        await dispatch(loadPrductFromAli(data));
        await dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setError(error));
      });
  };
};
