import axios from "axios";
import { userBaseUrl } from "../../api/baseUrl";
import getAuthenticationToken from "../../utils/getAuthenticationToken";

const API_URL = `${userBaseUrl}`;

// add rent item
const addRentItem = async (itemDetails) => {
  try {
    let config = getAuthenticationToken();
    const response = await axios.get(`${API_URL}addItem`, itemDetails, config);
    return response;
  } catch (error) {
    return error.response;
  }
};

// upload rent item images
const uploadItemImages = async (itemsImages) => {
  try {
    let config = getAuthenticationToken();
    const response = await axios.get(
      `${API_URL}uploadItemImages`,
      itemsImages,
      config
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

// get all items
const getAllItems = async () => {
  try {
    const response = await axios.get(`${API_URL}allItems`);
    return response;
  } catch (error) {
    return error.response;
  }
};

// get category list for user
const getCategoryListUser = async () => {
  try {
    let config = getAuthenticationToken();
    const response = await axios.get(`${API_URL}categoryListsForUser`);
    return response;
  } catch (error) {
    return error.response;
  }
};

const itemsService = {
  addRentItem,
  uploadItemImages,
  getAllItems,
  getCategoryListUser
};

export default itemsService;
