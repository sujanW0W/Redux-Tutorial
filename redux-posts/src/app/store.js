import { configureStore } from "@reduxjs/toolkit";
// import postsReducer from "../features/posts/postsSlice";
import usersReducer from "../features/users/usersSlice";

import { apiSlice } from "../features/api/apiSlice";

export const store = configureStore({
    reducer: {
        // posts: postsReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        users: usersReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});
