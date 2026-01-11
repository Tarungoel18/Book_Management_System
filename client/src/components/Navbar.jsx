import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function Navbar({ name = "Tarun" }) {
  const firstLetter = name.charAt(0).toUpperCase();

  return (
    <div className="fixed top-0 left-58 right-4 rounded-lg mt-4 h-14 bg-white shadow flex items-center justify-between px-6 z-10">
      
      <h1 className="text-[#374151] text-xl  font-medium">
        Welcome!
      </h1>

      <div className="flex items-center gap-2 cursor-pointer">
        <div className="h-8 w-8 flex items-center justify-center rounded-full bg-[#4F46E5] text-white font-medium">
          {firstLetter}
        </div>
        <KeyboardArrowDownIcon className="text-gray-600" />
      </div>

    </div>
  );
}
