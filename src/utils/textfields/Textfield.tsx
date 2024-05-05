import * as React from "react";
import TextField from "@mui/material/TextField";

interface TextfieldProps {
  label: string;
  value: any;
  onChange: (value: any) => void;
}

export default function Textfield({ value, label, onChange }: TextfieldProps) {
  const handleChange = (event: any) => {
    // Call the onChange prop with the selected value
    onChange(event.target.value);
  };
  return (
    <TextField
      fullWidth
      size="small"
      id="outlined-basic"
      label={label}
      value={value}
      variant="outlined"
      onChange={handleChange} // Pass handleChange function to onChange prop of Autocomplete
    />
  );
}
