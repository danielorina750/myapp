// src/components/RentedGames.js
import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";

const RentedGames = ({
  rentedGames,
  timer,
  pauseTimer,
  resumeTimer,
}) => {
  return (
    <Box mt={4}>
      <Typography variant="h5" gutterBottom>
        Your Rented Games
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={2}>
        {rentedGames.map((game) => (
          <Card key={game.id} style={{ width: 200 }}>
            <CardContent>
              <Typography variant="h6">{game.name}</Typography>
              <Typography variant="body2">{game.description}</Typography>
              <Typography variant="body2">Timer: {timer} minutes</Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={pauseTimer}
                style={{ marginTop: 10 }}
              >
                Pause Timer
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={resumeTimer}
                style={{ marginTop: 10 }}
              >
                Resume Timer
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default RentedGames;
