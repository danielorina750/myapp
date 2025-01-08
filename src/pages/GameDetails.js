// src/pages/GameDetails.js
import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";

const GameDetails = ({ game, onBorrow }) => {
  return (
    <Box sx={{ padding: 3 }}>
      <Paper sx={{ padding: 2 }}>
        <Typography variant="h5">{game.title}</Typography>
        <Typography variant="body1">{game.description}</Typography>
        <Typography variant="body2">Rating: {game.rating}</Typography>
        <Button variant="contained" color="primary" onClick={() => onBorrow(game.title)}>
          Borrow Game
        </Button>
      </Paper>
    </Box>
  );
};

export default GameDetails;
