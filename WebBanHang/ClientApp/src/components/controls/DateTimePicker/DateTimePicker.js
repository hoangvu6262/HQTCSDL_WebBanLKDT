import React from "react";
import { TextField } from "@mui/material";
// import dateFormat from "date-format";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  formDateTimePicker: {
    height: 80,
  },
});
export default function DateTimePicker(props) {
  const classes = useStyles();
  const { name, label, value, ...other } = props;
  // const convertDateFormat = dateFormat("dd/MM/yyyy", new Date(value));
  // console.log(convertDateFormat);
  return (
    <TextField
      className={classes.formDateTimePicker}
      variant="outlined"
      type="date"
      name={name}
      label={label}
      value={value}
      {...other}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}
