import {
  FaHome,
  FaUsers,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutUser } from "../services/authApi";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      alert("Logged out successfully");

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Logout failed");
    }
  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: <FaHome />,
      path: "/dashboard",
    },
    {
      name: "Workspaces",
      icon: <FaUsers />,
      path: "/workspaces",
    },
    {
      name: "Settings",
      icon: <FaCog />,
      path: "/settings",
    },
  ];

  return (
    <aside className="w-64 h-screen bg-slate-900 text-white fixed left-0 top-0 flex flex-col">

      <div className="text-2xl font-bold p-6 border-b border-slate-700">
        TeamSync
      </div>

      <nav className="flex-1 mt-4">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-6 py-4 transition-colors ${
                  location.pathname === item.path
                    ? "bg-slate-700"
                    : "hover:bg-slate-800"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 py-3 rounded-lg transition"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;