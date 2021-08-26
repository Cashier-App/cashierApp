import {
  Navbar,
  Sidebar,
  StatusTransaction,
  TableTransaction,
} from "../components";
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { FETCH_SALES } from "../config/transactionQuery";
import { useHistory } from "react-router-dom";

const Transaction = () => {
  const history = new useHistory();
  const { data, loading, error } = useQuery(FETCH_SALES);
  const [productSold, setProductSold] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  useEffect(() => {
    let allProductSold = 0;
    let totalAllSales = 0;
    let categories = [];
    if (!loading) {
      data.sales.forEach((el) => {
        totalAllSales += el.total;
        el.items.forEach((el2) => {
          categories.push(el2.item.category.name);
          allProductSold += el2.qty;
        });
      });
      setTotalCategories([...new Set(categories)].length);
      setProductSold(allProductSold);
      setTotalSales(totalAllSales);

      if (!localStorage.access_token) history.push("/login");
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
                  totalCategories={totalCategories}
                />
                <TableTransaction
                  sales={data.sales}
                  totalProductSold={productSold}
                />
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
