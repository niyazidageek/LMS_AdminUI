import { httpClient } from "../utils/httpClient";

export const getSubjects = () => {
  return httpClient.get("subject/getsubjects");
};
