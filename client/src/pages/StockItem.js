import {
  Navbar,
  Sidebar,
  StatusStockItem,
  TableStockItem,
} from "../components";

const StockItem = () => {
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
          <StatusStockItem />
          <TableStockItem />
        </div>
      </div>
    </div>
  );
};

export default StockItem;
