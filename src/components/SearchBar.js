// src/components/SearchBar.js
import React from "react";
import { TextField, Box } from "@mui/material";

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <Box sx={{ marginBottom: 3 }}>
      <TextField
        fullWidth
        label="Search for a game"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </Box>
  );
};

export default SearchBar;
