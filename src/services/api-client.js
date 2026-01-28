const { default: axios } = require("axios");

export const apiClient = axios.create({
  baseURL: "http://localhost:3000",
});
