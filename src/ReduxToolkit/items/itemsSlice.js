// itemsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import itemsService from "./itemsService";

const initialState = {
  data: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const addRentItem = createAsyncThunk(
  "items/addRentItem",
  async (itemDetails, thunkAPI) => {
    try {
      const response = await itemsService.addRentItem(itemDetails);
      return response;
    } catch (error) {
      const message = error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllItems = createAsyncThunk(
  "items/getAllItems",
  async (_, thunkAPI) => {
    try {
      const response = await itemsService.getAllItems();
      return response;
    } catch (error) {
      const message = error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getCategoryListUser = createAsyncThunk(
  "items/getCategoryListUser",
  async (_, thunkAPI) => {
    try {
      const response = await itemsService.getCategoryListUser();
      return response;
    } catch (error) {
      const message = error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    resetItems: (state) => {
      state.data = null;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // add rent item cases
      .addCase(addRentItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addRentItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload.data;
      })
      .addCase(addRentItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.data = null;
      })
      // get all items cases
      .addCase(getAllItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload.data;
      })
      .addCase(getAllItems.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.data = null;
      })
      // get category list user cases
      .addCase(getCategoryListUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategoryListUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload.data;
      })
      .addCase(getCategoryListUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.data = null;
      });
  },
});

export default itemsSlice.reducer;
export const { resetFetch } = itemsSlice.actions;
