import { FaBell } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

interface Props {
  search?: string;
  setSearch?: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  title?: string;
}

const Navbar = ({
  search = "",
  setSearch,
  placeholder = "Search...",
  title = "Dashboard",
}: Props) => {
  return (
    <div className="bg-white shadow h-16 flex items-center justify-between px-6">
      {/* Left Side */}
      <div className="flex items-center gap-6">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>

        {setSearch && (
          <div className="flex items-center border rounded-lg px-3 py-2 w-80">
            <FiSearch className="text-gray-500 mr-2" />

            <input
              type="text"
              placeholder={placeholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none w-full"
            />
          </div>
        )}
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5">
        <button className="relative">
          <FaBell size={20} />
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        <img
          src="https://i.pravatar.cc/40"
          alt="Profile"
          className="w-10 h-10 rounded-full border"
        />
      </div>
    </div>
  );
};

export default Navbar;