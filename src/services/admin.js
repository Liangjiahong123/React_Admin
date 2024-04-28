import { request } from "@umijs/max";

// 获取所有管理员
export function getAdminListApi(searchParams) {
  const { page, size, ...rest } = searchParams;
  let query = `page=${page}&size=${size}`;
  Object.keys(rest).forEach((key) => {
    if (rest[key]) {
      query += `&${key}=${rest[key]}`;
    }
  });
  return request(`/api/admin?${query}`, { method: "GET" });
}

// 删除管理员
export function deleteAdminByIdApi(id) {
  return request(`/api/admin/${id}`, { method: "DELETE" });
}

// 修改管理员
export function editAdminsApi(id, newAdminInfo) {
  return request(`/api/admin/${id}`, { method: "PATCH", data: newAdminInfo });
}

// 新增管理员
export function addAdminApi(newAdminInfo) {
  return request("/api/admin", { method: "POST", data: newAdminInfo });
}
