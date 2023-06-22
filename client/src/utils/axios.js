import axios from 'axios';

const baseURL = process.env.NODE_ENV === "development"
  ? "http://localhost:3001/"
  : "http://example.com"

const axiosCr = axios.create({
    baseURL,
    withCredentials: true
})

/
axiosCr.interceptors.response.use(
  response => (response), 
  error => (Promise.reject(error.response.data.err))
)

export default axiosCr;