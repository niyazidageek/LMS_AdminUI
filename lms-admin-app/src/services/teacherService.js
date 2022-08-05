import { httpClient } from "../utils/httpClient";

export const getTeachers = () => {
  return httpClient.get("user/getallteachers");
};

export const searchAllTeachers = (match) => {
  return httpClient.get("user/searchallteachers/"+match);
};
