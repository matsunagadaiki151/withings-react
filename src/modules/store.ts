import { configureStore } from "@reduxjs/toolkit";
import { envReducer, weightsReducer } from "./actions";

export const store = configureStore({
  reducer: {
    env: envReducer,
    weights: weightsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
