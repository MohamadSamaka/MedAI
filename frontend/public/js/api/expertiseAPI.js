import axiosInstance from './index.js';


export async function getExpertise() {
  try {
    const response = await axiosInstance.get('/protected/expertise', {
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
      error.response?.data?.message || "An error occurred during fetching expertise"
    );
  }
}