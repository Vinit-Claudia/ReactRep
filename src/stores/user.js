import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  value: [],
  hasMore: true,
  loading: false,
  error: false
};

export const getUsers = createAsyncThunk("users/getUsers", async (page) => {
  try {
    const response = await axios({
      method: "GET",
      url: `https://reqres.in/api/users?page=${page}`,
      headers: {
        ContentType: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
});

export const usersSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder)=> {
    builder.addCase(getUsers.pending, (state,action) => {
        state.loading = true;
    })
    builder.addCase(getUsers.fulfilled, (state,action) => {
        state.loading = false;
        state.value = [...state.value, ...action.payload.data];
        state.hasMore = action.payload.page !== action.payload.total_pages;
    })
    builder.addCase(getUsers.rejected, (state,action) => {
        state.error = true;
    })
  },
});

export default usersSlice.reducer;