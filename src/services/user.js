import { request } from "@umijs/max";

// 获取所有用户
export function getUserListApi(searchParams) {
  const { page, size, ...rest } = searchParams;
  let query = `page=${page}&size=${size}`;
  Object.keys(rest).forEach((key) => {
    if (rest[key]) {
      query += `&${key}=${rest[key]}`;
    }
  });
  return request(`/api/user?${query}`, { method: "GET" });
}

// 删除用户
export function deleteUserByIdApi(id) {
  return request(`/api/user/${id}`, { method: "DELETE" });
}

// 修改用户
export function editUserApi(id, newUserInfo) {
  return request(`/api/user/${id}`, { method: "PATCH", data: newUserInfo });
}

// 新增用户
export function addUserApi(newUserInfo) {
  return request("/api/user", { method: "POST", data: newUserInfo });
}
