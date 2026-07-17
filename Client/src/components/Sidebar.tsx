import {
    FaHome,
    FaUsers,
    FaComments,
    FaFileAlt,
    FaCog
} from "react-icons/fa";
import { Link } from "react-router-dom";
const Sidebar = () => {

    return (

        <div className="w-64 h-screen bg-slate-900 text-white fixed">

            <div className="text-2xl font-bold p-6">

                TeamSync

            </div>

            <nav className="mt-6">

                <ul>

                    <li className="flex items-center gap-3 p-4 hover:bg-slate-700 cursor-pointer">

                        <FaHome />

                        Dashboard

                    </li>

                    <li className="flex items-center gap-3 p-4 hover:bg-slate-700 cursor-pointer">

                        <FaUsers />

                        Workspaces

                    </li>

                    <li className="flex items-center gap-3 p-4 hover:bg-slate-700 cursor-pointer">

                        <Link to="/channels">
  <li className="flex items-center gap-3 p-4 hover:bg-slate-700 cursor-pointer">
    <FaComments />
    Channels
  </li>
</Link>

                    </li>

                    <li className="flex items-center gap-3 p-4 hover:bg-slate-700 cursor-pointer">

                        <FaFileAlt />

                        Documents

                    </li>

                    <li className="flex items-center gap-3 p-4 hover:bg-slate-700 cursor-pointer">

                        <FaCog />

                        Settings

                    </li>

                </ul>

            </nav>

        </div>

    );

};

export default Sidebar;