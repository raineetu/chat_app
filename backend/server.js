const express = require("express");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.get("/api/chat", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
