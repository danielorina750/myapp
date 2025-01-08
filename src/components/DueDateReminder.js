// src/components/DueDateReminder.js
import React from "react";
import { Box, Typography, Alert } from "@mui/material";
import moment from "moment";  // To format dates and calculate due dates

const DueDateReminder = ({ borrowedGames }) => {
  const currentDate = moment();
  
  const dueGames = borrowedGames.filter(game => {
    const dueDate = moment(game.dueDate);
    return dueDate.isBefore(currentDate.add(3, "days")) && !game.returned;
  });

  return (
    <Box sx={{ marginBottom: 3 }}>
      {dueGames.length > 0 ? (
        dueGames.map((game, index) => (
          <Alert key={index} severity="warning">
            <Typography>
              The game "{game.title}" is due in {moment(game.dueDate).fromNow()}.
            </Typography>
          </Alert>
        ))
      ) : (
        <Typography>No due games in the next 3 days.</Typography>
      )}
    </Box>
  );
};

export default DueDateReminder;
