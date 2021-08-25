import { Navbar, Sidebar, StatusItem } from "../components";
import Statistic from "./Stats";
import Stats7days from "../components/Stats7days";
import { useQuery } from "@apollo/client";
import { FETCH_SALES } from "../config/statistic";
import { sales } from "../config/dummyData";
import StatsCategory from "../components/StatsCategory";

const Statistic2 = () => {
  const { data: totalRevenue, loading, error } = useQuery(FETCH_SALES);
  return (
    <div>
      <div
        className="
               min-h-screen
               flex flex-col flex-auto flex-shrink-0
               antialiased
               bg-white
               dark:bg-gray-700
               text-black
               dark:text-white"
      >
        <Navbar />
        <Sidebar />
        <div className="h-full ml-14 mt-14 mb-10 md:ml-52 bg-white">
          <Statistic totalRevenue={totalRevenue} loading={loading} error={error} sales={sales} />
          <div className="mini-box grid grid-cols-1 grid-rows-2 gap-4 mt-6 text-2xl relative p-8">
            <Stats7days totalRevenue={totalRevenue} loading={loading} error={error} />
            <StatsCategory totalRevenue={totalRevenue} loading={loading} error={error} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistic2;
