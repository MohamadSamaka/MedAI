import { setAccessToken } from "/js/helpers/accessTokenManager.js";
import { setUserData } from "/js/helpers/userManager.js";
import axiosInstance from "./index.js";
export async function login(credentials) {
  try {
    const response = await axiosInstance.post("/auth/login", credentials, {
      withCredentials: true,
    });
    const accessToken = response.data.data.accessToken;
    setUserData(response.data.data.user)
    setAccessToken(accessToken);
  } catch (error) {
    console.error(
      "Login error:",
      error.response ? error.response.data : error.message
    );
    // Rethrow the error to be caught by a higher-level error handler
    throw new Error(
      error.response?.data?.message || "An error occurred during login"
    );
  }
}
