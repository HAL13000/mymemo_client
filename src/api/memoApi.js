import axiosClient from "./axiosClient";

// params=(Registerに渡されるユーザーデータ) をserverの方にPost（渡す）
// Postman のボディー要素に打ち込んでいたものがParamの中身

const memoApi = {
  create: () => axiosClient.post("memo"),
  getAll: () => axiosClient.get("memo"),
  getOne: (id) => axiosClient.get(`memo/${id}`),
  update: (id, params) => axiosClient.put(`memo/${id}`, params),
  delete: (id) => axiosClient.delete(`memo/${id}`),
  // ここのParamsは状態を更新した時TitleなのかDescriptionなのか伝えるため。第二引数に更新したい情報を渡す。
};

export default memoApi;
