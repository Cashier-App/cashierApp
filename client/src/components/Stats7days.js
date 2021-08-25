import React, { useState } from "react";
import { Bar } from "react-chartjs-2";

function Stats7days({ totalRevenue, loading, error }) {
  const [productSold, setProductSold] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
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

  const data = {
    labels: dates.reverse(),
    datasets: [
      {
        label: "Total Sales",
        data: totalSales,
        backgroundColor: ["rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)"],
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
    let totalDay = [0, 0, 0, 0, 0, 0, 0];
    if (!loading) {
      totalRevenue.sales.forEach((el) => {
        totalAllSales += el.total;
        el.items.forEach((el2) => {
          allProductSold += el2.qty;
        });
      });
      console.log(allProductSold);
      setProductSold(allProductSold);
      setTotalSales(totalAllSales);
      totalRevenue.sales.forEach((el, index) => {
        datesSales.forEach((el2, index2) => {
          if (el.date.slice(0, 10) === el2.slice(0, 10)) {
            // totalDay.push(el.total);
            totalDay[index2] += el.total;
            console.log(el.total, "ini el total");
          }
        });
      });
    }
    console.log(totalDay, "total day");
    setTotalSales(totalDay.reverse());
  }, [totalRevenue]);

  return (
    <>
      <div className="box-statistic py-auto">
        <Bar data={data} options={options} />
      </div>
    </>
  );
}

export default Stats7days;
