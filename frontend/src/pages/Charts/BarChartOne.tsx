import React from "react";
import Chart from "react-apexcharts";
import { monthlyBugs } from "../../data/dummy";

interface MonthlyBug {
  month: string;
  fixed: number;
}

const BarChartOne: React.FC = () => {
  const chartData: {
    series: { name: string; data: number[] }[];
    options: any;
  } = {
    series: [
      {
        name: "Bugs Fixed",
        data: monthlyBugs.map((item: MonthlyBug) => item.fixed),
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 300,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          borderRadius: 6,
          horizontal: false,
          columnWidth: "40%",
        },
      },
      dataLabels: { enabled: false },
      xaxis: {
        categories: monthlyBugs.map((item: MonthlyBug) => item.month),
        labels: { style: { fontSize: "12px" } },
      },
      yaxis: {
        title: { text: "Bugs Fixed" },
      },
      colors: ["#10B981"], // Tailwind emerald-500
    },
  };

  return (
    <div className="w-full">
      <Chart options={chartData.options} series={chartData.series} type="bar" height={300} />
    </div>
  );
};

export default BarChartOne;
