import axios from "axios";
const authService = require("../services/auth");

const API_URL = "http://localhost:8081/";

export const getContacts = () => {
  return axios.get(API_URL + "contacts", { headers: authService.authHeader() });
};

export const addContact = (name, phone, favourite) => {
  const data = {
    name,
    phone,
    favourite,
  };
  return axios.post(API_URL + "contacts", data, {
    headers: authService.authHeader(),
  });
};

export const deleteContact = (contactId) => {
  return axios.delete(API_URL + "contacts/" + contactId, {
    headers: authService.authHeader(),
  });
};

export const getContact = (id) => {
  return axios.get(API_URL + "contacts/" + id, {
    headers: authService.authHeader(),
  });
};

export const editContact = (contactId, name, phone, favourite) => {
  const data = {
    contactId,
    name,
    phone,
    favourite,
  };
  return axios.put(API_URL + "contacts/" + contactId, data, {
    headers: authService.authHeader(),
  });
};
