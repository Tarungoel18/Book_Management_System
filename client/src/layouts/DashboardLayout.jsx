import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div>
      <Sidebar />
      <Navbar />
      <div className="ml-54 mt-14 p-4">
        <Outlet />
      </div>
    </div>
  );
}
