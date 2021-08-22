import {
  Navbar,
  Sidebar,
  StatusStockIngredient,
  TableStockIngredient,
} from "../components";

const StockIngredient = () => {
  return (
    <div>
      <div
        class="
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
        <div class="h-full ml-14 mt-14 mb-10 md:ml-56 bg-gray-200">
          <StatusStockIngredient />
          <TableStockIngredient />
        </div>
      </div>
    </div>
  );
};

export default StockIngredient;
