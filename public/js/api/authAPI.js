import { setAccessToken } from "../../helpers/accessTokenManager.js";
import axiosInstance from "./index.js";

export async function login(credentials) {
  try {
    const response = await axiosInstance.post("/auth/login", credentials, {
      withCredentials: true,
    });

    //console.log("response = ", response.data.data.user);

    const accessToken = response.data.data.accessToken;
    setAccessToken(accessToken);

    return response.data.data.user;
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
