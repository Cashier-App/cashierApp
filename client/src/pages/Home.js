import { useQuery, useReactiveVar } from "@apollo/client";
import { useEffect, useState } from "react";
import { CardItem, Cart, Navbar, Sidebar, StatusItem } from "../components";
import { cartVar, itemVar } from "../config/reactiveVariabel";
import { FETCH_ALL_STOCK_ITEM } from "../config/StockItem";

const Home = () => {
  const { data, loading, error } = useQuery(FETCH_ALL_STOCK_ITEM);
  const [cartItem, setCardItem] = useState([]);
  console.log("HOme", data);

  // const stockItems = useReactiveVar(itemVar);
  // const cartItems = useReactiveVar(cartVar);
  // const { data, loading, error } = useQuery(FETCH_ALL_STOCK_ITEM);
  // if (!loading) {
  //   itemVar(data.updatedStockItems);
  // }

  // useEffect(() => {}, [cartItems, stockItems]);

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
          {!loading && !error && (
            <CardItem
              stockItems={data.stockItems}
              setCardItem={setCardItem}
              cartItem={cartItem}
            />
          )}
        </div>
        <Cart cartItem={cartItem} setCardItem={setCardItem} />
      </div>
    </div>
  );
};

export default Home;
