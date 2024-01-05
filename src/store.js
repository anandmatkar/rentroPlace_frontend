// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./ReduxToolkit/auth/authSlice";
import itemsReducer from "./ReduxToolkit/items/itemsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    items: itemsReducer,
    // Add other reducers as needed
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        // extraArgument: myCustomApiService,
      },
      serializableCheck: false,
    }),
});
