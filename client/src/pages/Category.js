import {
  Navbar,
  Sidebar,
  // StatusStockItem,
  TableCategory,
} from "../components";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
const Category = () => {
  const history = new useHistory();
  useEffect(() => {
    if (!localStorage.access_token) history.push("/login");
  }, []);
  return (
    <div>
      <div
        className="
                top-14
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
        <div className="h-full ml-14 mt-14 mb-10 md:ml-56 bg-gray-200">
          {/* <StatusCategory /> */}
          <TableCategory />
        </div>
      </div>
    </div>
  );
};

export default Category;
