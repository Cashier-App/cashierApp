import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { CardItem, Cart, Navbar, Sidebar, StatusItem } from "../components";
import { FETCH_ALL_STOCK_ITEM } from "../config/StockItem";
import { useHistory } from "react-router-dom";
const Home = () => {
  const history = new useHistory();
  const { data, loading, error } = useQuery(FETCH_ALL_STOCK_ITEM);
  const [cartItem, setCardItem] = useState([]);
  const [totalSale, setTotalSale] = useState(0);
  const [stockItems, setStockItems] = useState([]);

  useEffect(() => {
    if (!loading) {
      setStockItems(data.stockItems);
    }
    if (!localStorage.access_token) history.push("/login");
  }, [loading]);

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
          <StatusItem stockItems={stockItems} />
          {!loading && !error && (
            <CardItem
              stockItems={stockItems}
              setStockItems={setStockItems}
              setCardItem={setCardItem}
              cartItem={cartItem}
              setTotalSale={setTotalSale}
              totalSale={totalSale}
            />
          )}
        </div>
        <Cart
          stockItems={stockItems}
          setStockItems={setStockItems}
          cartItem={cartItem}
          setCardItem={setCardItem}
          totalSale={totalSale}
          setTotalSale={setTotalSale}
        />
      </div>
    </div>
  );
};

export default Home;
