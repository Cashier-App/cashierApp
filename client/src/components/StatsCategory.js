import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { useQuery, useReactiveVar } from "@apollo/client";
import { FETCH_CATEGORY } from "../config/categoryQuery";

function StatsCategory({ totalRevenue, loading, error }) {
  const { data: allCategory, loading: loadingCategory, error: errorCategory } = useQuery(FETCH_CATEGORY);
  const [productSold, setProductSold] = useState(0);
  const [total, setTotalSales] = useState(0);
  const [tempCategory, setTempCategory] = useState([]);
  const dates = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toLocaleDateString();
  });
  const datesSales = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString();
  });

  if (!loading) {
    console.log(allCategory);
  }

  const data = {
    labels: tempCategory,
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(255, 159, 64, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  React.useEffect(() => {
    let sortCategories = [];
    let stringifySales;
    let categoryObject = {};
    if (!loadingCategory && !loading) {
      stringifySales = JSON.parse(JSON.stringify(totalRevenue));
      let convertCategory = allCategory.categories.map((el) => el.name);
      stringifySales.sales.forEach((sale) => {
        sale.items.forEach((item) => {
          sortCategories.push(item.item.category.name, item.qty);
        });
      });

      for (let i = 0; i < sortCategories.length; i++) {
        if (categoryObject[sortCategories[i]] === undefined) {
          categoryObject[sortCategories[i]] = 1;
        } else {
          categoryObject[sortCategories[i]]++;
        }
      }
      console.log(categoryObject, "perhitungan kategori");

      setTempCategory(convertCategory);
      console.log(allCategory.categories);
      console.log(sortCategories, "udah di sort");
      console.log(stringifySales, "stringi");
    }

    //   let allProductSold = 0;
    //   let totalAllSales = 0;
    //   let totalDay = [];
    //   if (!loading) {
    //     sales.forEach((el) => {
    //       totalAllSales += el.total;
    //       el.items.forEach((el2) => {
    //         allProductSold += el2.qty;
    //       });
    //     });
    //     console.log(allProductSold);
    //     setProductSold(allProductSold);
    //     setTotalSales(totalAllSales);
    //     sales.forEach((el, index) => {
    //       datesSales.forEach((el2, index2) => {
    //         if (el.date.slice(0, 10) === el2.slice(0, 10)) {
    //           totalDay.push(el.total);
    //         }
    //       });
    //     });
    //   }
    //   console.log(totalDay, "total day");
    //   console.log(sales, "<<>>", datesSales);
    //   setTotalSales(totalDay);
  }, [allCategory, totalRevenue]);

  return (
    <>
      <div className="box-statistic px-44 py-auto">
        <Pie data={data} />
      </div>
    </>
  );
}

export default StatsCategory;
