import { useState, useEffect } from "react";
import { getBooksApi } from "./services/bookService.js";

export default function BooksTable() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const limit = 5;

  const [hasNextPage, setHasNextPage] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, [page]);

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getBooksApi(page, limit);

      const { data } = response.data;

      setBooks(data || []);

      setHasNextPage(data.length === limit);
    } catch (err) {
      console.error("Error fetching books:", err);
      setError("Failed to load books. Please try again.");
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

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Books
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
                  <th className="px-6 py-4 text-left">Title</th>
                  <th className="px-6 py-4 text-left">Author</th>
                  <th className="px-6 py-4 text-left">ISBN</th>
                  <th className="px-6 py-4 text-left">Price (₹)</th>
                  <th className="px-6 py-4 text-left">Quantity</th>
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
                        {book.title}
                      </td>
                      <td className="px-6 py-4">{book.author}</td>
                      <td className="px-6 py-4">{book.isbn}</td>
                      <td className="px-6 py-4">{book.price}</td>
                      <td className="px-6 py-4">{book.quantity}</td>
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
