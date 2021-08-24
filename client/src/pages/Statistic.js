import { Navbar, Sidebar, StatusItem } from "../components";
import Statistic from "./Stats";

const Statistic2 = () => {
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
        <div className="h-full ml-14 mt-14 mb-10 md:ml-52 bg-gray-200 mr-14 md:mr-80">
          <Statistic />
        </div>
      </div>
    </div>
  );
};

export default Statistic2;
