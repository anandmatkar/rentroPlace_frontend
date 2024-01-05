import axios from "axios";
import { userBaseUrl } from "../../api/baseUrl";
import getAuthenticationToken from "../../utils/getAuthenticationToken";

const API_URL = `${userBaseUrl}`;

// register user
const registerUser = async (userDetails) => {
  try {
    const response = await axios.post(`${API_URL}createUser`, userDetails);
    return response;
  } catch (error) {
    return error.response;
  }
};

// upload user profile photo
const uploadUserProfilePhoto = async (userProfilePhoto) => {
  try {
    const userProfilePhotoFormData = new FormData();
    userProfilePhotoFormData.append("avatar", userProfilePhoto);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const response = await axios.post(
      `${API_URL}uploadAvatar`,
      userProfilePhotoFormData,
      config
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

// verify user with link
const verifyUserWithLink = async (verifyToken) => {
  try {
    const config = {
      headers: {
        Authorization: verifyToken,
      },
    };
    const response = await axios.put(
      `${API_URL}verifyUserWithLink`,
      {},
      config
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

// login user
const loginUser = async (loginCredentials) => {
  try {
    const response = await axios.post(`${API_URL}LoginUser`, loginCredentials);
    if (response.data.status === 200) {
      localStorage.setItem("user-token", response.data.data.token);
    }
    return response;
  } catch (error) {
    return error.response;
  }
};

// logout current user
const logoutUser = async () => {
  localStorage.removeItem("user-token");
};

// forgot password
const forgotPassword = async (email) => {
  try {
    const response = await axios.put(`${API_URL}forgetPassword`, email);
    return response;
  } catch (error) {
    return error.response;
  }
};

// reset password
const resetPassword = async (resetPassCredentials) => {
  try {
    let resetPassword = {
      password: resetPassCredentials.new_password,
    };
    let config = {
      headers: {
        Authorization: resetPassCredentials.resetToken,
      },
    };
    const response = await axios.put(
      `${API_URL}resetPassword`,
      resetPassword,
      config
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

// fetch show profile
const fetchShowProfile = async () => {
  try {
    let config = getAuthenticationToken();
    const response = await axios.get(`${API_URL}showProfile`, config);
    return response;
  } catch (error) {
    return error.response;
  }
};

// edit user profile
const editUserProfile = async (updatedUserDetails) => {
  try {
    let config = getAuthenticationToken();
    const response = await axios.put(
      `${API_URL}editUser`,
      updatedUserDetails,
      config
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

// change user password
const changeUserPassword = async (changePassCredentials) => {
  try {
    let config = getAuthenticationToken();
    const response = await axios.put(
      `${API_URL}changePassword`,
      changePassCredentials,
      config
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

const authService = {
  registerUser,
  uploadUserProfilePhoto,
  verifyUserWithLink,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  fetchShowProfile,
  editUserProfile,
  changeUserPassword,
};

export default authService;
