// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import UserDashboard from './pages/UserDashboard';
import Login from './pages/Login';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <Router>
      <Navbar authenticated={authenticated} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route
          path="/login"
          element={<Login setAuthenticated={setAuthenticated} />}
        />

        <Route
          path="/dashboard"
          element={authenticated ? <UserDashboard /> : <Login setAuthenticated={setAuthenticated} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
