import {
  Navbar,
  Sidebar,
  StatusTransaction,
  TableTransaction,
} from "../components";

const Transaction = () => {
  return (
    <div>
      <div
        class="
              top-14
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
        <div class="h-full ml-14 mt-14 mb-10 md:ml-52 bg-gray-100">
          <StatusTransaction />
          <TableTransaction />
          {/* <CardItem /> */}
        </div>
      </div>
    </div>
  );
};

export default Transaction;
