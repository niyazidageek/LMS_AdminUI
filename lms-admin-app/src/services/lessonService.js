import { httpClient } from "../utils/httpClient";
import axios from "axios";

export const getLessonById = (id) => {
  return httpClient.get("lesson/getlessonbyid/" + id);
};

export const getLessons = () => {
  return httpClient.get("lesson/getlessons");
};

export const updateLesson = (data, id, token) => {
  return httpClient.put("lesson/editlesson/" + id, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createLesson = (data, token) => {
  return httpClient.post("lesson/createlesson", data,{
    headers: { 
        Authorization: `Bearer ${token}`, 
        "Content-Type": "multipart/form-data"
    }
  });
};



