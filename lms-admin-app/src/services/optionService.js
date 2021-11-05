import { httpClient } from "../utils/httpClient";

export const getOptionById = (id) => {
  return httpClient.get("option/getoptionbyid/" + id);
};

export const getOptions = () => {
  return httpClient.get("option/getoptions");
};

export const updateOption = (data, id, token) => {
  return httpClient.put("option/editoption/" + id, data, {
    headers: { 
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
     },
  });
};

export const createOption = (data, token) => {
  return httpClient.post("option/createoption", data,{
    headers: { 
        Authorization: `Bearer ${token}`, 
        "Content-Type": "multipart/form-data"
    }
  });
};