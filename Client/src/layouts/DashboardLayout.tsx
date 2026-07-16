import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

interface Props{

    children:React.ReactNode;
search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const DashboardLayout=({children}:Props)=>{

    return(

        <div>

            <Sidebar/>

            <div className="ml-64">

                <Navbar/>

                <div className="p-8">

                    {children}

                </div>

            </div>

        </div>

    )

}

export default DashboardLayout;