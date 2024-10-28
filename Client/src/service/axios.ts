
import axios, { AxiosInstance } from "axios";


const api:AxiosInstance=axios.create({
  // baseURL:"https://backend-e-commerce.shaham.website",
  baseURL: "http://localhost:4002",
  withCredentials:true,
});

export default api