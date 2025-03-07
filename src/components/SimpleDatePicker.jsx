import React, { useState, useEffect } from "react";
import {
  MenuItem,
  Select,
  TextField,
  Box,
  Popover,
  InputLabel,
  FormControl,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

const dateOptions = ["Last 7", "Last 14", "Last 30", "Last 90", "All", "Custom"];

export default function DateRangePicker() {
  const [selectedOption, setSelectedOption] = useState("Last 7");
  const [startDate, setStartDate] = useState(dayjs().subtract(7, "day"));
  const [endDate, setEndDate] = useState(dayjs());
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (selectedOption.includes("Last")) {
      const days = parseInt(selectedOption.split(" ")[1], 10);
      setStartDate(dayjs().subtract(days, "day"));
      setEndDate(dayjs());
    } else if (selectedOption === "All") {
      setStartDate(null);
      setEndDate(null);
    }
  }, [selectedOption]);

  // Handle keyboard accessibility for expanding dropdown
  const handleKeyPress = (event) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      setAnchorEl(event.currentTarget);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ position: "relative", width: 300 }}>
        {/* Input field that expands on click & keypress */}
        <TextField
          fullWidth
          id="date-range-input"
          label="Select Date Range"
          value={
            selectedOption === "Custom"
              ? `${startDate ? startDate.format("MM/DD/YYYY") : ""} - ${endDate ? endDate.format("MM/DD/YYYY") : ""}`
              : selectedOption
          }
          onClick={(e) => setAnchorEl(e.currentTarget)}
          onKeyDown={(e) => handleKeyPress(e)}
          readOnly
          role="combobox"
          aria-haspopup="true"
          aria-expanded={Boolean(anchorEl)}
          aria-controls="date-range-popover"
        />

        {/* Popover dropdown */}
        <Popover
          id="date-range-popover"
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          PaperProps={{
            sx: { width: 320, p: 2 },
            "aria-live": "polite",
          }}
        >
          {/* Dropdown with label */}
          <FormControl fullWidth>
            <InputLabel id="date-range-label">Select Range</InputLabel>
            <Select
              labelId="date-range-label"
              fullWidth
              value={selectedOption}
              onChange={(e) => {
                setSelectedOption(e.target.value);
                setAnchorEl(null); // Close dropdown after selection
              }}
              displayEmpty
              inputProps={{ "aria-labelledby": "date-range-label" }}
            >
              {dateOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Date pickers inside dropdown */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              disabled={selectedOption === "All"}
              slotProps={{
                textField: {
                  fullWidth: true,
                  inputProps: { "aria-label": "Start Date" },
                },
              }}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              disabled={selectedOption === "All"}
              slotProps={{
                textField: {
                  fullWidth: true,
                  inputProps: { "aria-label": "End Date" },
                },
              }}
            />
          </Box>
        </Popover>
      </Box>
    </LocalizationProvider>
  );
}
