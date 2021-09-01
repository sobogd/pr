import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { slidesApi } from "../services/slides";
import { productsApi } from "../services/products";

export const store = configureStore({
  reducer: {
    [slidesApi.reducerPath]: slidesApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(slidesApi.middleware, productsApi.middleware),
});

setupListeners(store.dispatch);
