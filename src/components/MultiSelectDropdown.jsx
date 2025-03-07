import { useState } from "react";
import { Box, Checkbox, ListItemText, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

const allOptions = ["DELAYED", "SKIPPED", "KEY MISSING", "KEY MISMATCH"];

export default function MultiSelectDropdown() {
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Handle selection change
  const handleChange = (event) => {
    const value = event.target.value;
    if (value.includes("Select All")) {
      handleSelectAll();
    } else {
      setSelectedOptions(value);
    }
  };

  // Handle "Select All" click
  const handleSelectAll = () => {
    if (selectedOptions.length === allOptions.length) {
      setSelectedOptions([]); // Deselect all
    } else {
      setSelectedOptions(allOptions); // Select all
    }
  };

  return (
    <Box sx={{ width: 250 }}>
      <FormControl fullWidth>
        <InputLabel id="multi-select-label">Alert Type</InputLabel>
        <Select
          multiple
          displayEmpty
          value={selectedOptions}
          onChange={handleChange}
          renderValue={(selected) =>
            selected.length ? selected.join(", ") : "Alert Type"
          }
          fullWidth
          aria-labelledby="multi-select-label"
          aria-multiselectable="true"
          MenuProps={{
            PaperProps: {
              sx: { maxHeight: 250, overflow: "auto" },
            },
          }}
        >
          {/* "Select All" Option */}
          <MenuItem
            value="Select All"
            onClick={handleSelectAll}
            aria-label="Select all alerts"
            role="option"
            aria-selected={selectedOptions.length === allOptions.length}
          >
            <Checkbox
              checked={selectedOptions.length === allOptions.length}
              indeterminate={selectedOptions.length > 0 && selectedOptions.length < allOptions.length}
              inputProps={{ "aria-label": "Select All" }}
            />
            <ListItemText primary="Select All" />
          </MenuItem>

          {/* Individual Options */}
          {allOptions.map((option) => (
            <MenuItem
              key={option}
              value={option}
              role="option"
              aria-selected={selectedOptions.includes(option)}
            >
              <Checkbox
                checked={selectedOptions.includes(option)}
                inputProps={{ "aria-label": option }}
              />
              <ListItemText primary={option} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
