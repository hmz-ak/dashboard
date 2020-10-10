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
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  paper1: {
    padding: theme.spacing(1),
    color: "white",
    background: "#2a2a2a",
    textAlign: "center",
    marginBottom: "19px",
    fontSize: "17px",
    border: "9px solid white",
    fontWeight: "bold",
  },
  paper2: {
    padding: theme.spacing(1),
    textAlign: "center",
  },
}));

function Dashboard() {
  const classes = useStyles();
  const config = {
    apiKey: "AIzaSyDMu-Vw30ykPPmFT3cXeunzKEi4EahzglI",
    spreadsheetId: "1vcDPrMexD8bxNwwzK9IxF8wch6Hfezq2eooJACDiqgg",
  };
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${config.apiKey}`;
  const [state, setState] = useState({
    items: [],
    dropdownOptions: [],
    otherData: [
      {
        label: "No. of sessions per user",
        value: 3,
      },
      {
        label: "Page per session",

        value: 8,
      },
      {
        label: "Average session time",
        value: 13,
      },
      {
        label: "bounce rate",

        value: 26,
      },
    ],
    pageData: [
      {
        label: "page views",
        value: 221040,
      },
      {
        label: "email source",

        value: 1,
      },
      {
        label: "sessions",

        value: 27134,
      },
    ],
    dataSource: [
      {
        label: "oraganic",
        value: 3537,
      },
      {
        label: "direct",

        value: 2961,
      },
      {
        label: "referral",

        value: 2469,
      },
      {
        label: "social source",

        value: 1994,
      },
    ],
    usersArr: [
      {
        label: "Users",

        value: 8272,
      },
      {
        label: "New Users",

        value: 7065,
      },
    ],
    selectedValue: "Jan 2018",
    organicSource: 3537,
    socialSource: 1994,
    directSource: 2961,
    refferalSource: 2469,
    pageViews: 221040,
    users: 8272,
    newUsers: 7065,
  });

  const getData = (arg) => {
    const arr = state.items;
    const arrLen = arr.length;
    let organicSource = 0;
    let directSource = 0;
    let socialSource = 0;
    let refferalSource = 0;
    let pageViews = 0;
    let users = 0;
    let newUsers = 0;
    let dataSource = [];
    let usersArr = [];
    let pageData = [];
    let otherData = [];

    let selectedValue = null;

    for (let i = 0; i < arrLen; i++) {
      if (arg === arr[i]["month"]) {
        organicSource = arr[i].organic_source;
        directSource = arr[i].direct_source;
        refferalSource = arr[i].referral_source;
        pageViews = arr[i].page_views;
        socialSource = arr[i].social_source;
        users = arr[i].users;
        newUsers = arr[i].new_users;

        dataSource.push(
          {
            label: "oraganic",
            value: arr[i].organic_source,
          },
          {
            label: "direct",

            value: arr[i].direct_source,
          },
          {
            label: "referral",

            value: arr[i].referral_source,
          },
          {
            label: "social source",

            value: arr[i].social_source,
          }
        );

        usersArr.push(
          {
            label: "Users",

            value: arr[i].users,
          },
          {
            label: "New Users",

            value: arr[i].new_users,
          }
        );
        pageData.push(
          {
            label: "page views",
            value: arr[i].page_views,
          },
          {
            label: "email source",

            value: arr[i].email_source,
          },
          {
            label: "sessions",

            value: arr[i].sessions,
          }
        );
        otherData.push(
          {
            label: "No. of sessions per user",
            value: arr[i].number_of_sessions_per_users,
          },
          {
            label: "Page per session",

            value: arr[i].page_per_session,
          },
          {
            label: "Average session time",
            value: arr[i].avg_session_time,
          },
          {
            label: "bounce rate",

            value: arr[i].bounce_rate,
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
      dataSource,
      usersArr,
      pageData,
      otherData,
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
          selectedValue: "Jan 2018",
        }));
      });
  }, [setState]);

  useEffect(() => {
    return () => {
      getData("Jan 2018");
    };
  }, [setState]);

  const options = ["one", "two", "three"];
  const defaultOption = options[0];
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper1}>Dashboard</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper2}>
            <Dropdown
              options={state.dropdownOptions}
              value={state.selectedValue}
              onChange={updateDashboard}
              placeholder="Select an option"
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}>
            <Card1
              title="Organic Source"
              value={state.organicSource}
              description="Hey There Whats Up"
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}>
            <Card1
              title="Direct Source"
              value={state.directSource}
              description="Hey There Whats Up"
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}>
            <Card1
              title="Refferal Source"
              value={state.refferalSource}
              description="Hey There Whats Up"
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Line title="Data Comparison" data={state.otherData} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}>
            <Card1
              title="Page Views"
              value={state.pageViews}
              description="Hey There Whats Up"
            />
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}>
            <Card1
              title="Users"
              value={state.users}
              description="Hey There Whats Up"
            />
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}>
            <Card1
              title="New Users"
              value={state.newUsers}
              description="Hey There Whats Up"
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Linechart title="Source Comparison" data={state.dataSource} />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Piechart title="Source Comparison" data={state.usersArr} />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Doughnout title="Source Comparison" data={state.pageData} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
