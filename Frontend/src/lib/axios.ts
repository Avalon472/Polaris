import axios from "axios";

//Axios instance for base backend url
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

//Attach Access Token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let isRefreshing = false;
//Used to prevent race condition from concurrent requests
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

//Addresses each failed request with renewed access token
const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(token!);
  });
  failedQueue = [];
};

//Intercept responses to check for expired token error
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    //Allow specified auth requests to fail to prevent infinite retry loop
    const skipRefresh = ["/auth/login", "/auth/signup", "/auth/refresh"];
    if (skipRefresh.some((url) => originalRequest.url === url)) {
      return Promise.reject(error);
    }

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      //Queue this request until the refresh resolves
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      //Need to use full url and not instance to avoid
      //attaching an access token from the interceptor
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/refresh`,
        {},
        {
          //Refresh token lives in httpOnly cookie
          withCredentials: true,
        },
      );

      const newToken = data.accessToken;
      localStorage.setItem("accessToken", newToken);
      processQueue(null, newToken);

      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      //Reject all queued requests
      processQueue(refreshError, null);
      localStorage.removeItem("accessToken");

      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
      return Promise.reject(refreshError);
    } finally {
      //All responses have been processed
      isRefreshing = false;
    }
  },
);

export default api;
