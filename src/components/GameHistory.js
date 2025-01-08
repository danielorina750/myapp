// src/components/GameHistory.js
import React from "react";
import { Typography, Box } from "@mui/material";
const GameHistory = ({ gameHistory }) => {
  return (
    <Box mt={4}>
      <Typography variant="h5" gutterBottom>
        Game History
      </Typography>
      <ul>
        {gameHistory.map((game, index) => (
          <li key={index}>
            {game.name} rented at {game.rentedAt.format("MMMM Do YYYY, h:mm:ss a")}, rented for {game.rentedFor} minutes.
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default GameHistory;
