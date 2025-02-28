import axiosInstance from "./index";

// Request interceptor to add the access token to each request
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an expired access token.
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        // Attempt to refresh the access token. The refresh endpoint
        // should read the refresh token from an HttpOnly cookie.
        const { data } = await axiosInstance.post("/refresh-token");
        const newAccessToken = data.accessToken;

        // Save the new access token in localStorage.
        localStorage.setItem("accessToken", newAccessToken);

        // Update the default authorization header for future requests.
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;

        // Retry the original request with the new token.
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // If token refresh fails, you might redirect to login.
        // For example: window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
