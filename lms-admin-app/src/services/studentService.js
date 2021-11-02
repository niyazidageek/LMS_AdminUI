import { httpClient } from "../utils/httpClient";

export const getStudents = () => {
  return httpClient.get("user/getallstudents");
};
