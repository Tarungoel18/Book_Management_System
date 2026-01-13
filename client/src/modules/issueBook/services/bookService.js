import axiosInstance from "../../../services/axiosInstance";

export const getBooksApi = () =>
  axiosInstance.get('/books');
