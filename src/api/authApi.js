import axiosClient from "./axiosClient";

// params=(Registerに渡されるユーザーデータ) をserverの方にPost（渡す）
// Postman のボディー要素に打ち込んでいたものがParamの中身

const authApi = {
  register: (params) => axiosClient.post("auth/register", params),
  login: (params) => axiosClient.post("auth/login", params),
  verifyToken: () => axiosClient.post("auth/verify-token"),
};

export default authApi;
