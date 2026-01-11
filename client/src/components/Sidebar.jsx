import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen fixed">
      <Link className="block p-4" to="/add-book">Add Book</Link>
      <Link className="block p-4" to="/books">Book List</Link>
    </div>
  );
}
