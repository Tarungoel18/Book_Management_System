import { useState, useEffect } from "react";
import { getstudents } from "./services/students.js";
import { useNavigate } from "react-router-dom";
export default function StudentsTable() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const limit = 5;

  const [hasNextPage, setHasNextPage] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, [page]);

  const fetchStudents = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getstudents(page, limit);
      const { data } = response.data;

      setStudents(data || []);
      setHasNextPage(data.length === limit);
    } catch (err) {
      console.error("Error fetching students:", err);
      setError("Failed to load students. Please try again.");
      setStudents([]);
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
          <p className="text-gray-600">Loading students...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
  <h1 className="text-3xl font-semibold text-gray-800">
    Students
  </h1>

  <button
    onClick={() => navigate("/add-student")}
    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md font-medium"
  >
    Add New Student
  </button>
</div>


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
                  <th className="px-6 py-4 text-left">Name</th>
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-left">Mobile No.</th>
                  <th className="px-6 py-4 text-left">About</th>
                </tr>
              </thead>

              <tbody>
                {students.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-6 text-center text-gray-500">
                      No students found
                    </td>
                  </tr>
                ) : (
                  students.map((student, index) => (
                    <tr
                      key={student.id}
                      className={`border-b ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4 font-medium">
                        {student.name}
                      </td>
                      <td className="px-6 py-4">{student.email_address}</td>
                      <td className="px-6 py-4">{student.mobile_number}</td>
                      <td className="px-6 py-4">{student.about}</td>
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
