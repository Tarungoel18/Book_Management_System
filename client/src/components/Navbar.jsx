import { useState, useRef, useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { logout } from "../slices/authSlice";
import {useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom";
export default function Navbar({ name = "Tarun", onLogout }) {
  const firstLetter = name.charAt(0).toUpperCase();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch()
  const navigate = useNavigate()


   const handleLogout = () => {
    setOpen(false)
    dispatch(logout());
    navigate("/login");
  };
  return (
    <div className="fixed top-0 left-58 right-4 mt-4 h-14 bg-white shadow rounded-lg flex items-center justify-between px-6 z-10">
      <h1 className="text-[#374151] text-xl font-medium">
        Welcome!
      </h1>

      <div className="relative" ref={dropdownRef}>
        <div
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-2 cursor-pointer select-none"
        >
          <div className="h-8 w-8 flex items-center justify-center rounded-full bg-[#4F46E5] text-white font-medium">
            {firstLetter}
          </div>
          <KeyboardArrowDownIcon
            className={`text-gray-600 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg overflow-hidden">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
