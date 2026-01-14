import { Routes, Route } from "react-router-dom";
import LoginPage from "../modules/login/page";
import AddBookPage from "../modules/addBook/page";
import BookListPage from "../modules/bookList/page";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import { Navigate } from "react-router-dom";
import IssuePage from "../modules/issueBook/page"
import ReturnBook from "../modules/returnBook/page";
import StudentsTable from "../modules/students/page.jsx";
import StudentForm from "../modules/addStudent/page.jsx";
export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>
            <Route element={<AuthLayout />}>
              <Route path="/" element={<Navigate to="/login" />} />
              </Route>
      <Route
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route path="/add-book" element={<AddBookPage />} />
        <Route path="/books" element={<BookListPage />} />
        <Route path="/issue-book" element={<IssuePage />} />
         <Route path="/return-book" element={<ReturnBook />} />
         <Route path="/students" element={<StudentsTable />} />
         <Route path="/add-student" element={<StudentForm/>} />



      </Route>
    </Routes>
  );
}
