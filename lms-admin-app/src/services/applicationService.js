import { httpClient } from "../utils/httpClient";

export const getApplicationById = (id, token) => {
  return httpClient.get("application/getapplicationbyid/" + id,{
    headers: { 
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
     },
  });
};

export const getApplicationsByPageAndSize = (page, size, token) => {
  return httpClient.get("application/getapplicationsbypageandsize/"+page+"/"+size,{
    headers: { 
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
     },
  });
};

export const deleteApplicationById = (id, token) => {
    return httpClient.delete("application/deleteapplicationbyid/" + id,{
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
         },
      });
  };
