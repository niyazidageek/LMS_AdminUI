import { httpClient } from "../utils/httpClient";

export const signIn = (data) => {
  console.log(data);
  return httpClient.post("user/loginadmin", data);
};

export const signUp = (data, token) => {
  return httpClient.post("user/registeradmin", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const requestResetPassword = (data) => {
  return httpClient.post("user/forgetpassword", data);
};

export const resetPassword = (data) => {
  return httpClient.post("user/resetpassword", data);
};

export const sendConfirmEmail = (data) => {
  return httpClient.post("user/sendconfirmationemail", data);
};

export const confirmEmail = (data) => {
  return httpClient.post("user/confirmemail", data);
};
