import { Navbar, Sidebar, StatusItem } from "../components";
import Statistic from "./Stats";
import Stats7days from "../components/Stats7days";
import { useQuery } from "@apollo/client";
import { FETCH_SALES } from "../config/statistic";
const Statistic2 = () => {
  const { data: totalRevenue, loading, error } = useQuery(FETCH_SALES);
  return (
    <div>
      <div
        className="
               min-h-screen
               flex flex-col flex-auto flex-shrink-0
               antialiased
               bg-gray-200
               dark:bg-gray-700
               text-black
               dark:text-white"
      >
        <Navbar />
        <Sidebar />
        <div className="h-full ml-14 mt-14 mb-10 md:ml-52 bg-gray-200">
          <Statistic totalRevenue={totalRevenue} loading={loading} error={error} />
          <Stats7days totalRevenue={totalRevenue} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
};

export default Statistic2;
