import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

interface AutoCompleteDropdownProps {
  placeholder: string;
  listData: any;
  multiple:boolean;
  onChange: (value: any) => void;
}
 
export default function AutoCompleteDropdown({
  placeholder = "placeholder",
  listData = [],
  multiple=false,
  onChange,
}: AutoCompleteDropdownProps) {
  const handleChange = (event: React.ChangeEvent<{}>, value: any) => {
    // Call the onChange prop with the selected value
    onChange(value);
    // console.log("value:",value.label)
  };

  return (
    <Autocomplete
      style={{width:'100%'}}
      multiple={multiple}
      size="small"
      disablePortal
      id="combo-box-demo"
      options={listData}
      sx={{ width: 300 }}
      onChange={handleChange} // Pass handleChange function to onChange prop of Autocomplete
      renderInput={(params) => (
        <TextField  {...params} label={placeholder} />
      )}
    />
  );
}
