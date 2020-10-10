import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import "./dashboard.css";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    background: "#2a2a2a",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
    borderBottom: "1px solid #665151",
    color: "white",
    fontWeight: 600,
    padding: "10px 10px",
    textAlign: "left",
  },

  val: {
    fontSize: 57,
    color: "white",
    fontWeight: 700,
    padding: "0px 7px",
    textAlign: "left",
  },
  desc: {
    fontSize: 12,
    color: "white",
    fontWeight: 700,
    paddingLeft: "13px",
    textAlign: "left",
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Card1({ title, value, description }) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} gutterBottom>
          {title}
        </Typography>
        <Typography className={classes.val} gutterBottom>
          {value}
        </Typography>
        <Typography className={classes.desc}>{description}</Typography>
      </CardContent>
    </Card>
  );
}
