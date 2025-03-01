import axiosInstance from './index.js';


export async function getLocations() {
  try {
    const response = await axiosInstance.get('/public/location', {
      withCredentials: true,
    });
    return response.data
  } catch (error) {
    console.error(
      "Login error:",
      error.response ? error.response.data : error.message
    );
    // Rethrow the error to be caught by a higher-level error handler
    throw new Error(
      error.response?.data?.message || "An error occurred during fetching location"
    );
  }
}

export async function getLocation(locationId) {
  try {
    const response = await axiosInstance.get(`/protected/location/${locationId}`, {
      withCredentials: true,
    });
    return response.data
  } catch (error) {
    console.error(
      "Login error:",
      error.response ? error.response.data : error.message
    );
    // Rethrow the error to be caught by a higher-level error handler
    throw new Error(
      error.response?.data?.message || "An error occurred during fetching location"
    );
  }
}

export async function getClosestLocations(locationId) {
  try {
    const response = await axiosInstance.get(`/protected/location/closest/${locationId}`, {
      withCredentials: true,
    });
    return response.data
  } catch (error) {
    console.error(
      "Login error:",
      error.response ? error.response.data : error.message
    );
    // Rethrow the error to be caught by a higher-level error handler
    throw new Error(
      error.response?.data?.message || "An error occurred during fetching location"
    );
  }
}
