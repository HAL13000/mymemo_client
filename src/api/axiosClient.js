import axios from "axios";

const BASE_URL = "http://localhost:3001/api/v1";
// const BASE_URL = process.env.API_URL;
// const BASE_URL = "https://mymemo-server.vercel.app/api/v1";

const getToken = () => localStorage.getItem("token");
const axiosClient = axios.create({
  baseURL: BASE_URL,
});
// Prepare before API
axiosClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,
      // リクエストヘッダーにJWTをつけてサーバーに渡す
    },
  };
});
// request add interceptor
axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => {
    throw err.response;
  }
);
export default axiosClient;
// interceptor =捕まえる　ここでは前処理などを捕まえる役割をしている
