import axios from "axios";

export const setAuth = (token) => {
  if (token) {
    axios.defaults.headers.common["authorization"] = `BEARER ${token}`;
  } else {
    delete axios.defaults.headers.common["authorization"];
  }
};
