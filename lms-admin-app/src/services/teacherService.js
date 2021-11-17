import { httpClient } from "../utils/httpClient";

export const getTeachers = () => {
  return httpClient.get("user/getallteachers");
};
