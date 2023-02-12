import React, { useMemo, useRef } from "react"
import countryList from "react-select-country-list";
import { Select, FormControl, MenuItem, InputLabel, Box } from "@material-ui/core"

export default function Local({ value, onChange }) {

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  const options = countryList().getData()

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl variant="outlined" fullWidth style = {{ width : '80%'}}>
        <InputLabel id="local-label">지역</InputLabel>
        <Select
          labelId="local-label"
          id="local"
          value={value}
          label="지역"
          onChange={(value) => handleChange(value)}
          
        >
          {options.map((country, idx) => <MenuItem key={idx} value={country.label}>{country.label}</MenuItem>)}
        </Select>
      </FormControl>
    </Box>
  );
}
// const Local = ({ value, onChange }) => {

//   const LocalChangeInput = (event) => {
//     onChange(event.target.value);
//   };

//   const options = countryList().getData()

//   return (
//     <>
//       <FormControl sx={{ m: 1, minWidth: 120 }}>
//         <Select
//           value={value}
//           labelId="local"
//           style={{ width: '80%' }}
//           id="local"
//           label="local"
//           onChange={(value) => LocalChangeInput(value)}>
//           {options.map((country) => <MenuItem value={country.value}>{country.label}</MenuItem>)}
//         </Select>
//       </FormControl>
//     </>
//   )
// }