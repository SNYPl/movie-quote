import axios from "axios";
import Cookies from "js-cookie";
const token = Cookies.get("token");
// const cookies = new Cookies();

console.log(token);

const axiosDef = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": process.env.ACCESS_ALLOW_URL,
    "Access-Control-Allow-Credentials": true,
    Authorization: `Bearer ${token}`,
  },
});

export default axiosDef;
