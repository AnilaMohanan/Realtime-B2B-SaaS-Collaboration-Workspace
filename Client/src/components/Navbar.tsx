import { FaBell } from "react-icons/fa";
interface Props {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}
const Navbar = ({ search, setSearch }: Props) => {

  return (

    <div className="bg-white shadow h-16 flex items-center justify-between px-8">

      <input
        type="text"
        placeholder="Search workspaces..."
         value={search}
          onChange={(e) => setSearch(e.target.value)}
        className="border rounded-lg p-2 w-80"
      />

      <div className="flex items-center gap-6">

        <FaBell size={20} />

        <img
          src="https://i.pravatar.cc/40"
          className="rounded-full"
          alt="Profile"
        />

      </div>

    </div>

  );
};

export default Navbar;