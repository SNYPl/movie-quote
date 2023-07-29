import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "development"
    ? `${process.env.REACT_APP_BACKEND_URL}/`
    : "http://example.com";

const axiosCr =
  axios.create({
    baseURL,
    withCredentials: true,
  }) /
  axiosCr.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error.response.data.err)
  );

export default axiosCr;
