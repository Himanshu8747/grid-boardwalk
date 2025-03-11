import { Box, InputBase, IconButton, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function AccessibleSearchBar() {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, maxWidth: 500, mx: "auto", mt: 4 }}>
      <Box
        component="label"
        htmlFor="search"
        sx={{
          display: "flex",
          alignItems: "center",
          border: "2px solid #ccc",
          borderRadius: "8px",
          px: 2,
          py: 1,
          flexGrow: 1,
          backgroundColor: "white",
        }}
      >
        <InputBase
          id="search"
          placeholder="Search your information universe"
          inputProps={{ "aria-label": "Search your information universe" }}
          sx={{ flexGrow: 1, fontSize: "1rem" }}
        />
        <IconButton aria-label="Search">
          <SearchIcon sx={{ color: "#555" }} />
        </IconButton>
      </Box>

      <Button variant="contained" sx={{ backgroundColor: "#0057D9", color: "white", fontWeight: "bold", px: 3 }}>
        Search
      </Button>
    </Box>
  );
}
