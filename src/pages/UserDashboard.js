import React, { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import './UserDashboard.css'; // Import the CSS file for styles

const UserDashboard = ({ onScan, onTimerControl }) => {
  const [scanError, setScanError] = useState(null);
  const [scanResult, setScanResult] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [rentedGames, setRentedGames] = useState([]);
  const [timer, setTimer] = useState(null);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");

  const availableGames = [
    { gameId: 1, name: "Game 1", description: "Exciting adventure game", price: "5 USD" },
    { gameId: 2, name: "Game 2", description: "Strategy game", price: "4 USD" },
    { gameId: 3, name: "Game 3", description: "Puzzle game", price: "3 USD" },
  ];

  useEffect(() => {
    if (scanError) {
      console.error("QR Scanner Error:", scanError);
    }
  }, [scanError]);

  const handleScan = (data) => {
    if (data) {
      console.log("Raw QR Code Data:", data);
      try {
        const parsedData = typeof data === "string" ? data : data.text;
        console.log("Parsed QR Code Data:", parsedData);

        let jsonData;
        try {
          jsonData = JSON.parse(parsedData);
          console.log("Parsed JSON Data:", jsonData);

          if (jsonData && jsonData.gameId) {
            onScan(jsonData.gameId);
          } else {
            alert("Invalid QR Code format. Missing 'gameId'.");
          }
        } catch (jsonError) {
          console.warn("QR Code is not JSON, using as plain text:", parsedData);
          onScan(parsedData);
        }
      } catch (err) {
        console.error("Error processing QR code:", err);
        setScanError(err);
        alert("An error occurred while scanning the QR code.");
      }
    } else {
      console.warn("No data scanned!");
    }
  };

  const handleError = (error) => {
    console.error("QR Scanner Error:", error);
    setScanError(error);
  };

  const startScanning = () => {
    setCameraActive(true);
  };

  const stopScanning = () => {
    setCameraActive(false);
  };

  const handlePause = () => {
    clearInterval(timer);
    onTimerControl("pause");
  };

  const handleResume = () => {
    onTimerControl("resume");
  };

  const handleStopTimer = () => {
    clearInterval(timer);
    setTimer(null);
    onTimerControl("stop");
  };

  const handleRentGame = (game) => {
    const newGame = { ...game, rentedAt: new Date(), timer: 0 };
    setRentedGames((prevGames) => [...prevGames, newGame]);

    const gameTimer = setInterval(() => {
      setRentedGames((prevGames) =>
        prevGames.map((rentedGame) =>
          rentedGame.gameId === game.gameId
            ? { ...rentedGame, timer: rentedGame.timer + 1 }
            : rentedGame
        )
      );
    }, 1000);

    setTimer(gameTimer);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      alert(`Message sent: ${message}`);
      setMessage(""); // Clear the message input
      toggleChat(); // Close the chat after sending
    } else {
      alert("Please enter a message.");
    }
  };

  return (
    <div className="dashboard-container">
      {/* Available Games Section */}
      <div className="left-section">
        <h3 className="section-title">Available Games</h3>
        <div className="games-container">
          {availableGames.map((game) => (
            <div key={game.gameId} className="game-card">
              <h4>{game.name}</h4>
              <p>{game.description}</p>
              <p><strong>{game.price}</strong></p>
              <button className="rent-button" onClick={() => handleRentGame(game)}>Rent Game</button>
            </div>
          ))}
        </div>
      </div>

      {/* Rented Games and Game History */}
      <div className="right-section">
        <h3 className="section-title">Rented Games</h3>
        <div className="rented-games">
          {rentedGames.map((game) => (
            <div key={game.gameId} className="rented-game-card">
              <h4>{game.name}</h4>
              <p>{game.description}</p>
              <p>Rented at: {game.rentedAt.toLocaleString()}</p>
              <p>Time elapsed: {game.timer} seconds</p>
              <div className="timer-controls">
                <button className="pause-button" onClick={handlePause}>Pause</button>
                <button className="resume-button" onClick={handleResume}>Resume</button>
                <button className="stop-button" onClick={handleStopTimer}>Stop Timer</button>
              </div>
            </div>
          ))}
        </div>

        <h3 className="section-title">Game History</h3>
        <div className="game-history">
          {rentedGames.length > 0 ? (
            rentedGames.map((game, index) => (
              <div key={index} className="history-card">
                <p><strong>Game Name:</strong> {game.name}</p>
                <p><strong>Rented at:</strong> {game.rentedAt.toLocaleString()}</p>
                <p><strong>Time Elapsed:</strong> {game.timer} seconds</p>
              </div>
            ))
          ) : (
            <p>No games rented yet.</p>
          )}
        </div>
      </div>

      {/* QR Scanner Section */}
      <h3 className="section-title">QR Scanner</h3>
      {!cameraActive && (
        <button className="start-button" onClick={startScanning}>Start Scanning</button>
      )}
      {cameraActive && (
        <>
          <QrReader
            delay={300}
            style={{ width: "100%" }}
            onScan={handleScan}
            onError={handleError}
            onResult={(result, error) => {
              if (result) {
                setScanResult(result);
                handleScan(result);
              }
            }}
          />
          <button className="stop-button" onClick={stopScanning}>Stop Scanning</button>
        </>
      )}

      {scanError && <p style={{ color: "red" }}>Error scanning QR: {scanError.message}</p>}
      {scanResult && <p>QR Code Result: {JSON.stringify(scanResult)}</p>}

      {/* Floating Chat Icon */}
      <div className="chat-icon" onClick={toggleChat}>
        💬
      </div>

      {/* Chat Modal */}
      {isChatOpen && (
        <div className="chat-modal">
          <div className="chat-container">
            <div className="chat-header">
              <h4>Chat with Owner</h4>
            </div>
            <div className="chat-messages">
              <p>Chat messages will appear here...</p>
            </div>
            <div className="chat-input-container">
              <input
                type="text"
                className="chat-input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
              />
              <button className="chat-send-button" onClick={handleSendMessage}>
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
