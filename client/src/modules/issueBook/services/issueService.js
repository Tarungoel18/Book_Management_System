import axiosInstance from "../../../services/axiosInstance";

export const issueBook = (data) =>
  axiosInstance.post(`/booksIssued`,data);
