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
    likeWit: (state, action) => {
      const witId = action.payload.witId;

      for (let wit of state.wits) {
        if (wit.id === witId) {
          wit.likes.push(action.payload);
        }
      }
    },
    unlikeWit: (state, action) => {
      const { userId, witId } = action.payload;

      for (let wit of state.wits) {
        if (wit.id === witId) {
          for (let i = 0; i < wit.likes.length; i++) {
            const like = wit.likes[i];

            if (like.userId === userId) {
              wit.likes.splice(i, 1);
              return state;
            }
          }
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFollowerWits.fulfilled, (state, action) => {
      state.wits = action.payload;
    });
  },
});

export const { addWit, likeWit, unlikeWit } = followerContent.actions;
export default followerContent.reducer;
