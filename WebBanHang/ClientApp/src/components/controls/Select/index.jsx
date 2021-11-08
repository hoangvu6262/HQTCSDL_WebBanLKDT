import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

export default function MuiSelect(props) {
  const { id, name, label, onChange, value, options, children } = props;

  //   const [currentValue, setcurrentValue] = useState(0);

  //   const handleChange = (event) => {
  //     onChange(event.target.value);
  //   };

  //   const selectedOption = options.find((option) => option.value === value);

  //   const handleSelectedOptionChange = (selectedOption) => {
  //     const selectedValue = selectedOption
  //       ? selectedOption.value
  //       : selectedOption;

  //     const changeEvent = {
  //       target: {
  //         name: name,
  //         value: selectedValue,
  //       },
  //     };
  //     onChange(changeEvent);
  //   };

  //   console.log(currentValue);

  return (
    <>
      <FormControl>
        <InputLabel id={id}>{label}</InputLabel>
        <Select
          name={name}
          onChange={onChange}
          value={value}
          //   onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {options.map((option) => {
            return (
              <MenuItem value={option.value} key={option.label}>
                {option.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </>
  );
}
