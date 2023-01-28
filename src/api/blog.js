import request from "@/utils/request";

export function getBlogs(page = 1, limit = 10) {
  return request({
    url: "/api/blog",
    method: "get",
    params: {
      page,
      limit,
    },
  });
}

export function deleteBlog(id) {
  return request({
    url: `/api/blog/${id}`,
    method: "delete",
  });
}

export function addBlogType(data) {
  return request({
    url: "/api/blogtype",
    method: "post",
    data,
  });
}

export function deleteBlogType(id) {
  return request({
    url: `/api/blogtype/${id}`,
    method: "delete",
  });
}

export function updateBlogType(id, data) {
  return request({
    url: `/api/blogtype/${id}`,
    method: "put",
    data,
  });
}

export function findBlogType(id) {
  return request({
    url: `/api/blogtype/${id}`,
    method: "get",
  });
}

export function getBlogTypes() {
  return request({
    url: `/api/blogtype/`,
    method: "get",
  });
}

export function addBlog(data) {
  return request({
    url: "/api/blog",
    method: "post",
    data,
  });
}

export function editBlog(id, data) {
  return request({
    url: `/api/blog/${id}`,
    method: "put",
    data,
  });
}

export function getBlogArtical(id) {
  return request({
    url: `/api/blog/${id}`,
    method: "get",
  });
}
