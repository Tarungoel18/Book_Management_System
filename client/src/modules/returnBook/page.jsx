import { useState, useEffect } from "react";
import {getIssueBook,patchStatus} from "./services/getIssueBook";
import VisibilityIcon from '@mui/icons-material/Visibility';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
export default function ReturnBook() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const limit = 5;

  const [hasNextPage, setHasNextPage] = useState(true);

  const formatDate = (dateString) => {
  if (!dateString) return "-";

  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);

  return `${day}/${month}/${year}`;
};


const getKeptDuration = (issueDate, returnDate) => {
  const issueTime = new Date(issueDate).getTime();
  const endTime = returnDate
    ? new Date(returnDate).getTime()
    : Date.now();

  const diffMs = endTime - issueTime;

  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return `${diffDays+1} day(s)`;
};



  useEffect(() => {
    fetchBooks();
  }, [page]);

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getIssueBook(page, limit);

      const { data } = response.data;

      setBooks(data || []);

      setHasNextPage(data.length === limit);
    } catch (err) {
      console.error("Error fetching books:", err);
      setBooks([]);
      setHasNextPage(false);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (hasNextPage) setPage((prev) => prev + 1);
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-b-2 border-indigo-600 rounded-full mx-auto mb-4" />
          <p className="text-gray-600">Loading books...</p>
        </div>
      </div>
    );
  }

  const handleReturn = async (id,status) => {
  console.log(id , "return id")
    const res = await patchStatus({id,status});
    console.log(res , "return response")
    fetchBooks();

  }
const dateObject = new Date();
const currentTimestampMs = dateObject.getTime();
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
         Issued Books
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-indigo-600 text-white">
                  <th className="px-6 py-4 text-left">ID</th>
                  <th className="px-6 py-4 text-left">Book ID</th>
                  <th className="px-6 py-4 text-left">Student ID</th>
                  <th className="px-6 py-4 text-left">Issue Date</th>
                  <th className="px-6 py-4 text-left">Return Date</th>
                    <th className="px-6 py-4 text-left">Book Kept Duration</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Action</th>

                </tr>
              </thead>

              <tbody>
                {books.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-6 text-center text-gray-500">
                      No books found
                    </td>
                  </tr>
                ) : (
                  books.map((book, index) => (
                    <tr
                      key={book.id}
                      className={`border-b ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4">{book.id}</td>
                      <td className="px-6 py-4 font-medium">
                        {book.book_id}
                      </td>
                      <td className="px-6 py-4">{book.student_id}</td>
                      <td className="px-6 py-4">{formatDate(book.issue_date)}</td>
                      <td className="px-6 py-4">{formatDate(book.return_date) || '-'}</td>
                      <td className="px-6 py-4">{getKeptDuration(book.issue_date, book.return_date)}</td>

                      <td className="px-6 py-4">{book.status}</td>
                      <td className="px-6 py-4 cursor-pointer" onClick={() => handleReturn(book.id,"R")}>{ book.status === 'I' ? <KeyboardReturnIcon/> : "Already Returned"}</td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-t">
            <span className="text-sm text-gray-600">
              Page {page}
            </span>

            <div className="flex gap-2">
              <button
                onClick={handlePrevPage}
                disabled={page === 1}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Previous
              </button>

              <button
                onClick={handleNextPage}
                disabled={!hasNextPage}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
