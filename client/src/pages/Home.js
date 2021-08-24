import { useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { CardItem, Cart, Navbar, Sidebar, StatusItem } from "../components";
import { itemVar } from "../config/reactiveVariabel";
import { FETCH_ALL_STOCK_ITEM } from "../config/StockItem";

const Home = () => {
  const stockItems = useReactiveVar(itemVar);
  const { data, loading, error } = useQuery(FETCH_ALL_STOCK_ITEM);
  if (!loading) {
    itemVar(data.stockItems);
  }

  useEffect(() => {}, [stockItems]);
  // console.log("Home", stockItems);

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
        <div className="h-full ml-14 mt-14 mb-10 md:ml-56 bg-gray-200 mr-14 md:mr-80">
          <StatusItem />
          {!loading && <CardItem />}
        </div>
        <Cart />
      </div>
    </div>
  );
};

export default Home;
