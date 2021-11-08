import React from "react";
import { TextField } from "@mui/material";

export default function TextArea(props) {
  const { rows, id, name, label, value, onChange, ...other } = props;
  return (
    <TextField
      multiline
      rows={rows}
      variant="outlined"
      id={id}
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      {...other}
    ></TextField>
  );
}
