import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFollowerWits = createAsyncThunk(
  "followerContent",
  async (skip) => {
    const { data } = await axios.get("http://10.0.0.147:4000/api/wit/explore", {
      skip,
    });
    return data;
  }
);

const followerContent = createSlice({
  name: "followerContent",
  initialState: { wits: [], status: null },
  reducers: {
    addWit: (state, action) => {
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
