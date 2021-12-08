import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import session from "./reducers/session";
import followerContent from "./reducers/followerWits";

export const store = configureStore({
  reducer: {
    session,
    followerContent,
  },
});
