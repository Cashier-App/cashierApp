import {
  Navbar,
  Sidebar,
  StatusStockItem,
  TableStockItem,
} from "../components";
import { FETCH_ALL_STOCK_ITEM } from "../config/StockItem";
import { useQuery } from "@apollo/client";
const StockItem = () => {
  const { data, loading, error } = useQuery(FETCH_ALL_STOCK_ITEM);
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
          {!loading && !error && (
            <StatusStockItem total={data.updatedStockItems.length} />
          )}

          {!loading && !error && (
            <TableStockItem stockItems={data.updatedStockItems} />
          )}
        </div>
      </div>
    </div>
  );
};

export default StockItem;
