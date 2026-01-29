const { default: axios } = require("axios");

export const apiClient = axios.create({
  baseURL: "http://sarahne.eu-4.evennode.com",
});
