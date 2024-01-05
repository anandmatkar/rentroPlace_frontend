// authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

//get user from local storage
const user = localStorage.getItem("user-token");

const initialState = {
  isAuthenticated: false,
  user: user ? user : null,
  data: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  userToken: user || null,
};

// register user
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userDetails, thunkAPI) => {
    try {
      const response = await authService.registerUser(userDetails);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// upload user profile image
export const uploadUserProfilePhoto = createAsyncThunk(
  "auth/uploadUserProfilePhoto",
  async (userProfilePhoto, thunkAPI) => {
    try {
      const response = await authService.uploadUserProfilePhoto(
        userProfilePhoto
      );
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// verify user with link
export const verifyUserWithLink = createAsyncThunk(
  "auth/verifyUserWithLink",
  async (verifyToken, thunkAPI) => {
    try {
      const response = await authService.verifyUserWithLink(verifyToken);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// login user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (loginCredentials, thunkAPI) => {
    try {
      const response = await authService.loginUser(loginCredentials);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// logout user
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await authService.logoutUser();
  try {
  } catch (error) {}
});

// forgot password
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, thunkAPI) => {
    try {
      const response = await authService.forgotPassword(email);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// reset password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (resetPassCredentials, thunkAPI) => {
    try {
      const response = await authService.resetPassword(resetPassCredentials);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// show user profile
export const fetchShowProfile = createAsyncThunk(
  "auth/fetchShowProfile",
  async (_, thunkAPI) => {
    try {
      const response = await authService.fetchShowProfile();
      return response;
    } catch (error) {
      const message = error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// edit user profile
export const editUserProfile = createAsyncThunk(
  "auth/editUserProfile",
  async (updatedUserDetails, thunkAPI) => {
    try {
      const response = await authService.editUserProfile(updatedUserDetails);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// change user password
export const changeUserPassword = createAsyncThunk(
  "auth/changeUserPassword",
  async (changePassCredentials, thunkAPI) => {
    try {
      const response = await authService.changeUserPassword(
        changePassCredentials
      );
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.isAuthenticated = false;
      state.user = user ? user : null;
      state.data = null;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // register user cases
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload.data;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.data = null;
      })
      // upload user profile image cases
      .addCase(uploadUserProfilePhoto.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadUserProfilePhoto.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload.data;
      })
      .addCase(uploadUserProfilePhoto.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.data = null;
      })
      // verify user with link cases
      .addCase(verifyUserWithLink.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyUserWithLink.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload.data;
      })
      .addCase(verifyUserWithLink.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.data = null;
      })
      // login user cases
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload.data;
        // Use optional chaining to safely access the token
        state.user = action.payload.data?.data?.token || null;
        state.userToken = action.payload.data?.data?.token || null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      // logout user cases
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.userToken = null;
      })
      // forgot password cases
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload.data;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.data = null;
      })
      // reset password cases
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload.data;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.data = null;
      })
      // show user profile cases
      .addCase(fetchShowProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchShowProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload.data;
      })
      .addCase(fetchShowProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.data = null;
      })
      // edit user profile cases
      .addCase(editUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload.data;
      })
      .addCase(editUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.data = null;
      })
      // change user password cases
      .addCase(changeUserPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeUserPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload.data;
      })
      .addCase(changeUserPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.data = null;
      });
  },
});

export const { login, logout, resetAuth } = authSlice.actions;
export default authSlice.reducer;
