import { request } from "@umijs/max";

// 获取所有书籍
export function getBookListApi(searchParams) {
  const { page, size, ...rest } = searchParams;
  let query = `page=${page}&size=${size}`;
  Object.keys(rest).forEach((key) => {
    if (rest[key]) {
      query += `&${key}=${rest[key]}`;
    }
  });
  return request(`/api/book?${query}`, { method: "GET" });
}

// 删除书籍
export function deleteBookByIdApi(id) {
  return request(`/api/book/${id}`, { method: "DELETE" });
}

// 修改书籍
export function editBookApi(id, newBookInfo) {
  return request(`/api/book/${id}`, { method: "PATCH", data: newBookInfo });
}

// 新增书籍
export function addBookApi(newBookInfo) {
  return request("/api/book", { method: "POST", data: newBookInfo });
}
