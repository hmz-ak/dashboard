import React, { useEffect } from "react";
import Bar from "../charts/Bar";
import Doughnout from "../charts/Doughnut";
import Line from "../charts/Line";
import Linechart from "../charts/Linechart";
import Pareto from "../charts/Pareto";
import Piechart from "../charts/Piechart";
import "./dashboard.css";

function Dashboard() {
  const config = {
    apiKey: "AIzaSyDMu-Vw30ykPPmFT3cXeunzKEi4EahzglI",
    spreadsheetId: "1vcDPrMexD8bxNwwzK9IxF8wch6Hfezq2eooJACDiqgg",
  };
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${config.apiKey}`;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => console.log(data.valueRanges[0]));
  });

  const chartData = [
    {
      label: "Venezuela",
      value: "290",
    },
    {
      label: "Saudi",
      value: "260",
    },
    {
      label: "Canada",
      value: "180",
    },
    {
      label: "Iran",
      value: "140",
    },
    {
      label: "Russia",
      value: "115",
    },
    {
      label: "UAE",
      value: "100",
    },
    {
      label: "US",
      value: "30",
    },
    {
      label: "China",
      value: "30",
    },
  ];

  return (
    <div>
      <Linechart data={chartData} />
      <Piechart data={chartData} />
      <Pareto data={chartData} />
      <Bar data={chartData} />
      <Line data={chartData} />
      <Doughnout data={chartData} />
    </div>
  );
}

export default Dashboard;
