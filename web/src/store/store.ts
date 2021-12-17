import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import session from "./reducers/session";
import followerContent from "./reducers/followerWits";

import { enableMapSet } from "immer";

enableMapSet();

export const store = configureStore({
  reducer: {
    session,
    followerContent,
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
