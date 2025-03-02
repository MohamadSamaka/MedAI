import axiosInstance from "./index.js";

export async function getUserChatLog() {
  try {
    const response = await axiosInstance.get(
      "/protected/chat",
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Login error:",
      error.response ? error.response.data : error.message
    );
    // Rethrow the error to be caught by a higher-level error handler
    throw new Error(
      error.response?.data?.message ||
        "An error occurred during fetching expertise"
    );
  }
}

export async function sendMessage(message) {
  try {
    const response = await axiosInstance.post(
      "/protected/chat",
      {
        message,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Login error:",
      error.response ? error.response.data : error.message
    );
    // Rethrow the error to be caught by a higher-level error handler
    throw new Error(
      error.response?.data?.message ||
        "An error occurred during fetching expertise"
    );
  }
}
