// src/components/UserProfile.js
import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

const UserProfile = ({ userProfile }) => {
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        User Profile
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="h6">Name: {userProfile.name}</Typography>
          <Typography variant="body2">Email: {userProfile.email}</Typography>
          <Button variant="outlined" color="primary" style={{ marginTop: 10 }}>
            Edit Profile
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
