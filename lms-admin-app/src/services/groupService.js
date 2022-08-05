import { httpClient } from "../utils/httpClient";

export const getGroupById = (id) => {
  return httpClient.get("group/getgroupbyid/" + id);
};

export const getGroups = (page, size) => {
  return httpClient.get("group/getgroupsbycount/" +page + "/" + size);
};

export const updateGroup = (data, id, token) => {
  return httpClient.put("group/editgroup/" + id, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createGroup = (data, token) => {
  return httpClient.post("group/creategroup", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteGroupById = (id) => {
  return httpClient.delete("group/deletegroup/" + id);
}