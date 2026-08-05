import {
  FaHome,
  FaUsers,
  FaComments,
  FaFileAlt,
  FaCog,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

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
       {
      name: "LogOut",
      icon: <FaCog />,
      path: "/",
    },
  ];

  return (
    <aside className="w-64 h-screen bg-slate-900 text-white fixed left-0 top-0">
      <div className="text-2xl font-bold p-6 border-b border-slate-700">
        TeamSync
      </div>

      <nav className="mt-4">
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
    </aside>
  );
};

export default Sidebar;