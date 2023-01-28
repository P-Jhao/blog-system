import request from "@/utils/request";

export function getComments(page = 1, limit = 10, blogid = -1) {
  return request({
    url: "/api/comment",
    method: "get",
    params: {
      page,
      limit,
      blogid,
    },
  });
}

export function deleteComment(id) {
  return request({
    url: `/api/comment/${id}`,
    method: "delete",
  });
}
