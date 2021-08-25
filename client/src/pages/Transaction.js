import {
  Navbar,
  Sidebar,
  StatusTransaction,
  TableTransaction,
} from "../components";
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { FETCH_SALES } from "../config/transactionQuery";
const Transaction = () => {
  const { data, loading, error } = useQuery(FETCH_SALES);
  const [productSold, setProductSold] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  useEffect(() => {
    let allProductSold = 0;
    let totalAllSales = 0;
    if (!loading) {
      data.sales.forEach((el) => {
        totalAllSales += el.total;
        el.items.forEach((el2) => {
          allProductSold += el2.qty;
        });
      });
      setProductSold(allProductSold);
      setTotalSales(totalAllSales);
    }
  }, [data]);
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
            {!loading && !error && (
              <>
                <StatusTransaction
                  totalSale={data.sales.length}
                  totalProductSold={productSold}
                  totalAllSales={totalSales}
                />
                <TableTransaction sales={data.sales} />
              </>
            )}
          </div>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};

export default Transaction;
