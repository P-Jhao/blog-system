import request from "@/utils/request";

export function getProjects() {
  return request({
    url: "/api/project",
    method: "get",
  });
}

export function addProject(data) {
  return request({
    url: "/api/project",
    method: "post",
    data,
  });
}

export function editProject(id, data) {
  return request({
    url: `/api/project/${id}`,
    method: "put",
    data,
  });
}

export function deleteProject(id) {
  return request({
    url: `/api/project/${id}`,
    method: "delete",
  });
}
