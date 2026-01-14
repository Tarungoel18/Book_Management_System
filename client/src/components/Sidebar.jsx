import { NavLink } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import PersonIcon from '@mui/icons-material/Person';
export default function Sidebar() {
  const activeClass =
    "bg-white text-[#4F46E5] rounded-lg";

  const inactiveClass =
    "text-white hover:bg-white/10";

  return (
    <div className="fixed left-0 top-0 m-3 w-52 h-[calc(100vh-1.5rem)] bg-[#4F46E5] rounded-xl">

      {/* Logo */}
      <div className="flex items-center mx-4 py-6">
        <img src="./logo.png" className="h-8" />
      </div>

      <div className="mx-4 text-[12px] text-white/70">
        Main Menu
      </div>

      <nav className="mt-2 space-y-1">
        <NavLink
          to="/add-book"
          className={({ isActive }) =>
            `flex items-center gap-3 px-6 w-40 ml-4 py-2 text-base ${
              isActive ? activeClass : inactiveClass
            }`
          }
        >
          <DashboardIcon fontSize="small" />
          Add Book
        </NavLink>

        <NavLink
          to="/books"
          className={({ isActive }) =>
            `flex items-center gap-3 px-6 w-40 ml-4 py-2 text-base ${
              isActive ? activeClass : inactiveClass
            }`
          }
        >
          <MenuBookIcon fontSize="small" />
          Book List
        </NavLink>

           <NavLink
          to="/students"
          className={({ isActive }) =>
            `flex items-center gap-3 px-6 w-40 ml-4 py-2 text-base ${
              isActive ? activeClass : inactiveClass
            }`
          }
        >
          <PersonIcon fontSize="small" />
           Students
        </NavLink>

         <NavLink
          to="/issue-book"
          className={({ isActive }) =>
            `flex items-center gap-3 px-6 w-40 ml-4 py-2 text-base ${
              isActive ? activeClass : inactiveClass
            }`
          }
        >
          <LibraryBooksIcon fontSize="small" />
          Issue Book
        </NavLink>

         <NavLink
          to="/return-book"
          className={({ isActive }) =>
            `flex items-center gap-3 px-6 w-40 ml-4 py-2 text-base ${
              isActive ? activeClass : inactiveClass
            }`
          }
        >
          <KeyboardReturnIcon fontSize="small" />
          Return
        </NavLink>
      </nav>
    </div>
  );
}
