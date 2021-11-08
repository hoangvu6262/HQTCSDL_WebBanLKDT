import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import { makeStyles } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& label": {
      color: "black",
      paddingLeft: 10,
    },
    "& .MuiInputLabel-root": {
      "&.Mui-focused": {
        top: 0,
        left: "-2px",
      },
    },
    "& .MuiOutlinedInput-root": {
      "& input": {
        padding: 12,
      },
      "& fieldset": {
        border: "none",
      },
    },
  },
  searchIcon: {
    color: "black",
  },
}));

export default function Search(props) {
  const classes = useStyles();
  const { id, value, onChange, name, label, ...other } = props;
  return (
    <>
      <TextField
        autoComplete="off"
        className={classes.root}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={label}
        name={name}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon className={classes.searchIcon} />
            </InputAdornment>
          ),
        }}
        {...other}
      />
    </>
  );
}
