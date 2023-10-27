import axiosClient from "./axiosClient";

// params=(Registerに渡されるユーザーデータ) をserverの方にPost（渡す）
const authApi = {
  register: (params) => axiosClient.post("auth/register", params),
};

export default authApi;
