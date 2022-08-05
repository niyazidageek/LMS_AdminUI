import { httpClient } from "../utils/httpClient";

export const getStudents = () => {
  return httpClient.get("user/getallstudents");
};

export const searchAllStudents = (match) => {
  return httpClient.get("user/searchallstudents/"+match);
};
