import React, { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader"; // Assuming you're using a library like `react-qr-reader` for QR scanning

const QRScanner = ({ onScan }) => {
  const [scanError, setScanError] = useState(null);
  const [scanResult, setScanResult] = useState(null); // Define scanResult and its setter
  

  useEffect(() => {
    // Handle any errors with QR scanning
    if (scanError) {
      console.error("QR Scanner Error:", scanError);
    }
  }, [scanError]);

  const handleScan = (data) => {
    if (data) {
      console.log("Raw QR Code Data:", data);
      try {
        // Handle QR code data (either as text or a JSON object)
        const parsedData = typeof data === "string" ? data : data.text; // Ensure it's a string

        console.log("Parsed QR Code Data:", parsedData);

        // If the data is expected to be JSON, try parsing it
        let jsonData;
        try {
          jsonData = JSON.parse(parsedData); // Attempt to parse if it's JSON
          console.log("Parsed JSON Data:", jsonData);

          if (jsonData && jsonData.gameId) {
            // Pass the parsed gameId to the parent component (onScan)
            onScan(jsonData.gameId);
          } else {
            console.warn("Invalid QR Code JSON: Missing 'gameId'");
            alert("Invalid QR Code format. Missing 'gameId'.");
          }
        } catch (jsonError) {
          // Handle non-JSON QR codes
          console.warn("QR Code is not JSON, using as plain text:", parsedData);
          onScan(parsedData); // Send the raw text or handle it accordingly
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

  return (
    <div>
      <h3>QR Scanner</h3>
      {/* Use a QR code scanner component */}
      <QrReader
        delay={300}
        style={{ width: "100%" }}
        onScan={handleScan}
        onError={handleError}
        onResult={(result, error) => {
          if (result) {
            setScanResult(result); // Update scanResult state
            handleScan(result); // Call handleScan with result
          }
        }}
      />
      {scanError && <p style={{ color: "red" }}>Error scanning QR: {scanError.message}</p>}
      {scanResult && <p>QR Code Result: {JSON.stringify(scanResult)}</p>} {/* Display the result */}
    </div>
  );
};

export default QRScanner;
