import {
  Navbar,
  Sidebar,
  StatusTransaction,
  TableTransaction,
} from "../components";
import { useQuery } from "@apollo/client";
import { FETCH_SALES } from "../config/transactionQuery";
const Transaction = () => {
  const { data, loading, error } = useQuery(FETCH_SALES);
  return (
    <div>
      {!loading ? (
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
            <StatusTransaction />
            <TableTransaction sales={data.sales} />
            {/* <CardItem /> */}
          </div>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};

export default Transaction;
