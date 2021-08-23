import { useQuery } from "@apollo/client";
import {
  Navbar,
  Sidebar,
  StatusStockIngredient,
  TableStockIngredient,
} from "../components";
import { FETCH_ALL_INGREDIENTS } from "../config/ingredient";

const StockIngredient = () => {
  const { data, loading, error } = useQuery(FETCH_ALL_INGREDIENTS);

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
          {!loading && (
            <StatusStockIngredient stockIngredients={data.stockIngredients} />
          )}
          {!loading && (
            <TableStockIngredient stockIngredients={data.stockIngredients} />
          )}
        </div>
      </div>
    </div>
  );
};

export default StockIngredient;
