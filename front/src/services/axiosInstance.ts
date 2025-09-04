import axios from "axios";
import { logOut } from "./auth";

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
  withCredentials: true,
});

// Set up the response interceptor
api.interceptors.response.use(
  (response) => response, // Pass through successful responses
  async (error) => {
    const originalRequest = error.config;

    // If we get a 401 and haven't already tried refreshing
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 2. Try to refresh the token
        const refreshResponse = await api.post("token/refresh/", {
          withCredentials: true,
        });

        // 3. Get the new access token
        const newAccessToken = refreshResponse.data.access;

        // 4. Store the new access token in the headers and cookies
        // You can store it in cookies or state as needed
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // Optionally update cookies with the new tokens
        document.cookie = `access_token=${newAccessToken}; path=/; samesite=Lax`;
        document.cookie = `refresh_token=${refreshResponse.data.refresh}; path=/; samesite=Lax`;

        // 5. Retry the original request with the new access token
        return api(originalRequest); // Retry the request
      } catch (refreshError) {
        console.error("Token refresh failed", refreshError);
        // logOut(); // Handle logout or redirect to login page
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error); // For other errors, reject
  }
);

export default api;
