const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);

// Set up SSE endpoint
app.get("/events", (req, res) => {
  // Set headers to indicate SSE
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Send initial comment to establish connection
  res.write(": connection established\n\n");

  // Send periodic updates to clients
  const intervalId = setInterval(() => {
    const eventData = {
      message: "This is a sample message",
      timestamp: new Date().toISOString(),
    };

    // Send event data
    res.write(`data: ${JSON.stringify(eventData)}\n\n`);
  }, 1000);

  // Handle client disconnection
  req.on("close", () => {
    clearInterval(intervalId);
    console.log("Client disconnected");
  });
});

server.listen(3001, () => {
  console.log("Server is running on port 3001");
});
