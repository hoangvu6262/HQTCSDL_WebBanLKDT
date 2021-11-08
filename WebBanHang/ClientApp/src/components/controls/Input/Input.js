import React from "react";
import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  input: {
    height: 75,
  },
});

export default function Input(props) {
  const classes = useStyles();
  const { id, value, onChange, name, label, ...other } = props;
  return (
    <TextField
      className={classes.input}
      variant="outlined"
      id={id}
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      // type={type}
      {...other}
    />
  );
}
