import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { Reply, Wit } from "../../types";

interface FollowerContent {
  wits: Wit[];
  status: String;
}

export const fetchFollowerWits = createAsyncThunk(
  "follower/Content",
  async (skip) => {
    //@ts-ignore
    const { data } = await axios.get("/api/wit/explore", { skip });
    return data;
  }
);

interface CommentWit {
  comment: Reply;
  wit: Wit;
}

const followerContent = createSlice({
  name: "followerContent",
  initialState: { wits: [], status: "" } as FollowerContent,
  reducers: {
    addWit: (state, action) => {
      //@ts-ignore
      state.wits.unshift(action.payload);
    },

    addComment: (state, action) => {
      const { comment, wit } = action.payload as CommentWit;
      const { wits } = state;

      wits.forEach((el) => {
        if (el.id === wit.id) {
          //@ts-ignore
          el.replies = [...el.replies, comment];
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFollowerWits.fulfilled, (state, action) => {
      state.wits = action.payload;
    });

    builder.addCase(fetchFollowerWits.rejected, (state, action) => {
      state.status = "an error occured";
    });
  },
});

export const { addWit, addComment } = followerContent.actions;
export default followerContent.reducer;
