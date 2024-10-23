
import axios, { AxiosInstance } from "axios";


const api:AxiosInstance=axios.create({
  baseURL: "http://localhost:",
  withCredentials: true,
});

export default api