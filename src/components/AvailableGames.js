// src/components/AvailableGames.js
import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";

const AvailableGames = ({ availableGames, handleRentGame }) => {
  return (
    <Box mt={4}>
      <Typography variant="h5" gutterBottom>
        Available Games
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={2}>
        {availableGames.map((game) => (
          <Card key={game.id} style={{ width: 200 }}>
            <CardContent>
              <Typography variant="h6">{game.name}</Typography>
              <Typography variant="body2">{game.description}</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleRentGame(game)}
                style={{ marginTop: 10 }}
              >
                Rent Game
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default AvailableGames;
