import axios from "@/config/axios/index.js";

export const setJwtToken = (token) => {
  axios.defaults.headers["Authorization"] = `Bearer ${token}`;
};
