import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import session from "./reducers/session";

export const store = configureStore({
  reducer: {
    session,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
