import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFollowerWits = createAsyncThunk(
  "followerContent",
  async (skip) => {
    //@ts-ignore
    const { data } = await axios.get("/api/wit/explore", { skip });
    return data;
  }
);

const followerContent = createSlice({
  name: "followerContent",
  initialState: { wits: [], status: null },
  reducers: {
    addWit: (state, action) => {
      //@ts-ignore
      state.wits.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFollowerWits.fulfilled, (state, action) => {
      state.wits = action.payload;
    });
  },
});

export const { addWit } = followerContent.actions;
export default followerContent.reducer;
