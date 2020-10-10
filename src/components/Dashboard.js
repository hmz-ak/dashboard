import React, { useEffect, useState } from "react";
import Bar from "../charts/Bar";
import Doughnout from "../charts/Doughnut";
import Line from "../charts/Line";
import Linechart from "../charts/Linechart";
import Pareto from "../charts/Pareto";
import Piechart from "../charts/Piechart";
import "./dashboard.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Card1 from "./Card";

function Dashboard() {
  const config = {
    apiKey: "AIzaSyDMu-Vw30ykPPmFT3cXeunzKEi4EahzglI",
    spreadsheetId: "1vcDPrMexD8bxNwwzK9IxF8wch6Hfezq2eooJACDiqgg",
  };
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${config.apiKey}`;
  const [state, setState] = useState({
    items: [],
    dropdownOptions: [],
    trendStore: [],
    selectedValue: null,
    organicSource: null,
    directSource: null,
    refferalSource: null,
    pageViews: null,
    users: null,
    newUsers: null,
  });

  const getData = (arg) => {
    const arr = state.items;
    const arrLen = arr.length;
    let organicSource = 0;
    let directSource = 0;
    let refferalSource = 0;
    let pageViews = 0;
    let users = 0;
    let newUsers = 0;

    let selectedValue = null;
    let trendStore = [];

    for (let i = 0; i < arrLen; i++) {
      if (arg === arr[i]["month"]) {
        organicSource = arr[i].organic_source;
        directSource = arr[i].direct_source;
        refferalSource = arr[i].refferal_source;
        pageViews = arr[i].page_views;
        users = arr[i].users;
        newUsers = arr[i].new_users;

        trendStore.push(
          {
            label: "oraganic",
            value: arr[i].organic_source,
          },
          {
            label: "referral",

            value: arr[i].referral_source,
          }
        );
      }
    }
    selectedValue = arg;

    setState((prevState) => ({
      ...prevState,
      organicSource,
      directSource,
      refferalSource,
      pageViews,
      users,
      newUsers,
    }));
  };

  const updateDashboard = (event) => {
    getData(event.value);
    setState((prevState) => ({ ...prevState, selectedValue: event.value }));
    console.log(state.users);
  };

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let batchRowValues = data.valueRanges[0].values;
        const rows = [];
        for (let i = 1; i < batchRowValues.length; i++) {
          let rowObject = {};
          for (let j = 0; j < batchRowValues[i].length; j++) {
            rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
          }
          rows.push(rowObject);
        }

        // dropdown options
        let dropdownOptions = [];
        for (let i = 0; i < rows.length; i++) {
          dropdownOptions.push(rows[i].month);
        }

        dropdownOptions = Array.from(new Set(dropdownOptions)).reverse();
        setState((prevState) => ({
          ...prevState,
          items: rows,
          dropdownOptions: dropdownOptions,
          selectedValue: "Feb 2018",
        }));
      });
  }, [setState]);

  useEffect(() => {
    return () => {
      getData("Jan 2018");
    };
  }, [setState]);
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
  const options = ["one", "two", "three"];
  const defaultOption = options[0];
  return (
    <div>
      <Dropdown
        options={state.dropdownOptions}
        value={state.selectedValue}
        onChange={updateDashboard}
        placeholder="Select an option"
      />
      <Card1 title="Hamza" value={1234} description="Hey There Whats Up" />
      <Card1 title="Hamza" value={1234} description="Hey There Whats Up" />
      <Card1 title="Hamza" value={1234} description="Hey There Whats Up" />
    </div>
  );
}

export default Dashboard;
