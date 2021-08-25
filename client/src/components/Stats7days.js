import React, { useState } from "react";
import { Bar } from "react-chartjs-2";

function Stats7days({ totalRevenue, loading, error, sales }) {
  const [productSold, setProductSold] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const dates = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toLocaleDateString();
  });

  const data = {
    labels: dates.reverse(),
    datasets: [
      {
        label: "Total Sales",
        data: [12, 19, 3, 5, 2, 3, 7],
        backgroundColor: ["rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
      {
        label: "Product Sold",
        data: [12, 19, 3, 5, 2, 3, 7],
        backgroundColor: ["rgba(255, 159, 64, 0.2)"],
        borderColor: ["rgba(255, 159, 64, 1)"],
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
    let allProductSold = 0;
    let totalAllSales = 0;
    if (!loading) {
      sales.sales.forEach((el) => {
        totalAllSales += el.total;
        el.items.forEach((el2) => {
          allProductSold += el2.qty;
        });
      });
      console.log(allProductSold);
      setProductSold(allProductSold);
      setTotalSales(totalAllSales);
    }
  }, [sales]);

  return (
    <>
      <div className="mini-box grid grid-cols-2 grid-rows-2 gap-4 mt-6 ml-8 text-2xl relative">
        <div>
          <Bar data={data} options={options} />
        </div>
      </div>
    </>
  );
}

export default Stats7days;
