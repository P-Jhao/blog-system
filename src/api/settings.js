import request from "@/utils/request";

export function getSettings() {
  return request({
    url: "/api/setting",
    method: "get",
  });
}

export function setSettings(data) {
  return request({
    url: "/api/setting",
    method: "put",
    data,
  });
}
