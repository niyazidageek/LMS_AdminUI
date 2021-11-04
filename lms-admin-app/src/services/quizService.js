import { httpClient } from "../utils/httpClient";

export const getQuizById = (id) => {
  return httpClient.get("quiz/getquizbyid/" + id);
};

export const getQuizzes = () => {
  return httpClient.get("quiz/getquizzes");
};

export const updateQuiz = (data, id, token) => {
  return httpClient.put("quiz/editquiz/" + id, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createQuiz = (data, token) => {
  return httpClient.post("quiz/createquiz", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
