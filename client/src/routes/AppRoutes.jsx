import { Routes, Route } from "react-router-dom";
import LoginPage from "../modules/login/page";
import AddBookPage from "../modules/addBook/page";
import BookListPage from "../modules/bookList/page";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import { Navigate } from "react-router-dom";
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
      </Route>
    </Routes>
  );
}
