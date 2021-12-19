import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { Like, UserSession, Wit } from "../../types";

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

export const likeWit = createAsyncThunk("session/like", async (wit) => {
  const { data } = await axios.post("/api/wit/like", { wit });
  if (data) {
    return data;
  }
});

export const unlikeWit = createAsyncThunk(
  "session/unlike",
  async (wit: Wit) => {
    const { data } = await axios.delete("/api/wit/unlike", {
      data: { witId: wit.id },
    });
    if (data) {
      return wit.id;
    }
    return undefined;
  }
);

const sessionSlice = createSlice({
  name: "session",
  initialState: {
    user: null,
    status: null,
    likes: [],
  } as UserSession,
  reducers: {},
  extraReducers: (builder) => {
    const getLikeIds = (likes: Like[]) => {
      const likeIds: Number[] = [];

      for (let like of likes) {
        likeIds.push(like.witId);
      }

      return likeIds;
    };

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
      state.likes = getLikeIds(action.payload.witLikes);
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = "username, email, or password are incorrect";
      state.user = null;
    });

    builder.addCase(restoreUser.fulfilled, (state, action) => {
      state.status = "success";
      state.user = action.payload;
      console.log(action.payload);
      state.likes = getLikeIds(action.payload.witLikes);
    });

    builder.addCase(restoreUser.rejected, (state, _action) => {
      state.status = "not logged in";
      state.user = null;
    });

    builder.addCase(logoutUser.fulfilled, (state, _action) => {
      state.status = "success";
      state.user = null;
      state.likes = [];
    });

    builder.addCase(logoutUser.rejected, (state, _action) => {
      state.status = "something went wrong, please try again.";
    });

    builder.addCase(likeWit.fulfilled, (state, action) => {
      console.log(action.payload.witId);
      state.likes.push(action.payload.witId);
    });

    builder.addCase(unlikeWit.fulfilled, (state, action) => {
      const id = action.payload;
      state.likes = state.likes.filter((e) => e !== id);
    });
  },
});

export default sessionSlice.reducer;
