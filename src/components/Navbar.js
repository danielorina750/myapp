// src/components/Navbar.js

import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LoginIcon from "@mui/icons-material/Login";

const Navbar = ({ authenticated, onLogout }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if screen is small

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  const renderLinks = () => (
    <>
      <Button
        color="inherit"
        component={Link}
        to="/"
        startIcon={<HomeIcon />}
        style={{ textTransform: "none", fontWeight: "bold" }}
      >
        Home
      </Button>
      {authenticated ? (
        <>
          <Button
            color="inherit"
            component={Link}
            to="/dashboard"
            startIcon={<DashboardIcon />}
            style={{ textTransform: "none", fontWeight: "bold" }}
          >
            Dashboard
          </Button>
          <Button
            color="inherit"
            onClick={onLogout}
            startIcon={<ExitToAppIcon />}
            style={{ textTransform: "none", fontWeight: "bold" }}
          >
            Logout
          </Button>
        </>
      ) : (
        <Button
          color="inherit"
          component={Link}
          to="/login"
          startIcon={<LoginIcon />}
          style={{ textTransform: "none", fontWeight: "bold" }}
        >
          Login
        </Button>
      )}
      <Button
        color="inherit"
        component={Link}
        to="/about"
        startIcon={<InfoIcon />}
        style={{ textTransform: "none", fontWeight: "bold" }}
      >
        About
      </Button>
      <Button
        color="inherit"
        component={Link}
        to="/contact"
        startIcon={<ContactMailIcon />}
        style={{ textTransform: "none", fontWeight: "bold" }}
      >
        Contact
      </Button>
    </>
  );

  return (
    <>
      {/* AppBar for Desktop */}
      <AppBar position="static" style={{ backgroundColor: "#212121" }}>
        <Toolbar>
          <Typography
            variant="h6"
            style={{
              flexGrow: 1,
              fontFamily: "'Roboto', sans-serif",
              fontWeight: "bold",
              fontSize: "1.5rem",
            }}
          >
            Game Lending System
          </Typography>

          {/* If it's mobile, show the menu icon */}
          {isMobile ? (
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box>{renderLinks()}</Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
        style={{ backgroundColor: "#333", color: "#fff" }}
        transitionDuration={300}
      >
        <Box
          role="presentation"
          onClick={() => toggleDrawer(false)}
          onKeyDown={() => toggleDrawer(false)}
          style={{
            width: 250,
            backgroundColor: "#333",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            paddingTop: "20px",
          }}
        >
          {renderLinks()}
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
