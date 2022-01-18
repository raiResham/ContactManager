import axios from "axios";

const API_URL = "http://localhost:8081/";

export const login = (email, password) => {
  return axios.post(API_URL + "login", {
    email,
    password,
  });
};

export const signup = (email, password, confirmPassword) => {
  return axios.post(API_URL + "signup", {
    email,
    password,
    confirmPassword,
  });
};

export const authHeader = () => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    return { "x-access-token": accessToken };
  } else {
    return {};
  }
};

export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};
