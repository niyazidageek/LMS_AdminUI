import { httpClient } from "../utils/httpClient";

export const getSubjects = () => {
  return httpClient.get("subject/getsubjects");
};

export const getSubjectById = (id) => {
  return httpClient.get("subject/getsubjectbyid/" + id);
};

export const updateSubject = (data, id, token) => {
  return httpClient.put("subject/editsubject/" + id, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createSubject = (data, token) => {
  return httpClient.post("subject/createsubject", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};


export const getSubjectsByPageAndSize = (page, size) => {
  return httpClient.get("subject/GetSubjectsByPageAndSize/"+page+"/"+size);
};

export const deleteSubjectById=(id)=>{
  return httpClient.delete("subject/deletesubject/"+id);
}