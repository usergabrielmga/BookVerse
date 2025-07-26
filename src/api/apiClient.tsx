import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://www.googleapis.com/books/v1/", 
  headers: {
    "Content-Type": "application/json",
  },
});


apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erro na API:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;