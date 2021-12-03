import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { UserSession } from "../../types";

export const registerUser = createAsyncThunk(
  "session/register",
  async (credentials) => {
    const { data } = await axios.post("/api/session/register", credentials);
    return data;
  }
);

export const loginUser = createAsyncThunk(
  "session/login",
  async (credentials) => {
    const { data } = await axios.post("/api/session/login", credentials);
    return data;
  }
);

export const restoreUser = createAsyncThunk("session/restore", async () => {
  const { data } = await axios.post("/api/session/restore");
  return data;
});

export const logoutUser = createAsyncThunk("session/logout", async () => {
  await axios.delete("/api/session/logout");
  return null;
});

const sessionSlice = createSlice({
  name: "session",
  initialState: { user: null, status: null } as UserSession,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.status = "success";
      state.user = action.payload;
    });

    builder.addCase(registerUser.rejected, (state, _action) => {
      state.status = "username or email already taken";
      state.user = null;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.status = "success";
      state.user = action.payload;
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = "username, email, or password are incorrect";
      state.user = null;
    });

    builder.addCase(restoreUser.fulfilled, (state, action) => {
      state.status = "success";
      state.user = action.payload;
    });

    builder.addCase(restoreUser.rejected, (state, _action) => {
      state.status = "not logged in";
      state.user = null;
    });

    builder.addCase(logoutUser.fulfilled, (state, _action) => {
      state.status = "success";
      state.user = null;
    });

    builder.addCase(logoutUser.rejected, (state, _action) => {
      state.status = "something went wrong, please try again.";
    });
  },
});

export default sessionSlice.reducer;
