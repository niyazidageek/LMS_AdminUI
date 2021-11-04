import { httpClient } from "../utils/httpClient";

export const getQuestionById = (id) => {
  return httpClient.get("question/getquestionbyid/" + id);
};

export const getQuestions = () => {
  return httpClient.get("question/getquestions");
};

export const updateQuestion = (data, id, token) => {
  return httpClient.put("question/editquestion/" + id, data, {
    headers: { 
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
     },
  });
};

export const createQuestion = (data, token) => {
  return httpClient.post("question/createquestion", data,{
    headers: { 
        Authorization: `Bearer ${token}`, 
        "Content-Type": "multipart/form-data"
    }
  });
};