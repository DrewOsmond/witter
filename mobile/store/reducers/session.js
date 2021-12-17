import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

const saveToken = async (jwt) => {
  await SecureStore.setItemAsync("token", jwt);
};

export const registerUser = createAsyncThunk(
  "session/register",
  async (credentials) => {
    const response = await axios.post(
      "http://10.0.0.147:4000/api/session/register",
      credentials
    );

    const { data } = response;
    const token = response.request.responseHeaders["Set-Cookie"]
      .split(";")[0]
      .slice(6);

    saveToken(token).catch(console.error);

    return data;
  }
);

export const loginUser = createAsyncThunk(
  "session/login",
  async (credentials) => {
    const response = await axios.post(
      "http://10.0.0.147:4000/api/session/login",
      credentials
    );
    const { data } = response;
    const token = response.request.responseHeaders["Set-Cookie"]
      .split(";")[0]
      .slice(6);

    saveToken(token).catch(console.error);
    return data;
  }
);

export const restoreUser = createAsyncThunk("session/restore", async () => {
  const token = await SecureStore.getItemAsync("token");
  const { data } = await axios.post(
    "http://10.0.0.147:4000/api/session/restore",
    {
      token,
    }
  );
  return data;
});

export const logoutUser = createAsyncThunk("session/logout", async () => {
  await axios.delete("http://10.0.0.147:4000/api/session/logout");
  await SecureStore.deleteItemAsync("token");
  return null;
});

const sessionSlice = createSlice({
  name: "session",
  initialState: { user: "loading", status: null },
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
