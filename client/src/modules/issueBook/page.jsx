import React, { useEffect, useState } from "react";
import { getStudentsApi } from "./services/studentService";
import { getBooksApi } from "./services/bookService";
import { issueBook } from "./services/issueService";
import { useNavigate } from "react-router-dom";
const IssuePage = () => {
  const [loading, setIsLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedBook, setSelectedBook] = useState("");
  const navigate = useNavigate();

  const fetchStudentsAndBooks = async () => {
    setIsLoading(true);
    try {
      const [studentsRes, booksRes] = await Promise.all([getStudentsApi(), getBooksApi()]);
      setStudents(studentsRes?.data?.data ?? []);
      setBooks(booksRes?.data?.data ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentsAndBooks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e)
    console.log("Selected student:", selectedStudent);
    console.log("Selected book:", selectedBook);
  
  const res =   await issueBook({
       student_id : selectedStudent+"",
       book_id: selectedBook+"",
       statuss:'I'
    })
    navigate("/add-book");
  };

  if (loading) return <h1>Loading</h1>;

  return (
    <div className="flex">
        <h1 className="font-800 text-xl mt-10">Issue Book</h1>
      <form className="flex flex-col gap-10"  onSubmit={handleSubmit}>

        <div className="flex mt-20 gap-11 justify-center items-center">
               <label className="font-normal">Student : </label>
        <select
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
          className="border p-2  block  cursor-pointer"
        >
          <option value="">Select student</option>
          {students.map((s) => (
            <option key={s.id ?? s.student_id} value={s.id ?? s.student_id}>
              {s.name}
            </option>
          ))}
        </select>

        <label className="font-normal">Books :</label>
        <select
          value={selectedBook}
          onChange={(e) => setSelectedBook(e.target.value)}
          className="border p-2 block cursor-pointer"
        >
          <option value="">Select book</option>
          {books.map((b) => (
            <option key={b.id ?? b.book_id} value={b.id ?? b.book_id}>
              {b.title ?? b.name ?? "Untitled"}
            </option>
          ))}
        </select>
        </div>
     

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default IssuePage;