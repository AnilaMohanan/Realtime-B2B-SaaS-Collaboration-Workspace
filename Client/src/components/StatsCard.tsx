import type { ReactNode } from "react";

interface Props {
  title: string;
  value: number;
  icon: ReactNode;
  color: string;
}

const StatsCard = ({ title, value, icon, color }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between hover:shadow-xl transition duration-300">

      <div>
        <p className="text-gray-500 text-sm">{title}</p>

        <h2 className="text-3xl font-bold mt-2">{value}</h2>
      </div>

      <div className={`${color} p-4 rounded-full text-white text-2xl`}>
        {icon}
      </div>

    </div>
  );
};

export default StatsCard;