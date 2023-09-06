import axios from "axios";

const axiosDef = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": process.env.ACCESS_ALLOW_URL,
    "Access-Control-Allow-Credentials": true,
    // Cookie: `token=${token};`,
  },
});

export default axiosDef;
