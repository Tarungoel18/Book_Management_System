import axiosInstance from "../../../services/axiosInstance";

export const getIssueBook = (page, limit) =>
  axiosInstance.get(`/booksIssued/issuedBooks?page=${page}&limit=${limit}`);

  export const patchStatus = (data) =>
  axiosInstance.patch(`/booksIssued/issuedBooks`,data);