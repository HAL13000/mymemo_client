import axiosClient from "./axiosClient";

// params=(Registerに渡されるユーザーデータ) をserverの方にPost（渡す）
// Postman のボディー要素に打ち込んでいたものがParamの中身

const memoApi = {
  create: () => axiosClient.post("memo"),
};

export default memoApi;
