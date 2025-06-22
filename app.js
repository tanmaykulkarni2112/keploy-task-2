// app.js
const express = require("express");
const app = express();
const attendanceRouter = require("./routes/attendanceRoute");

app.use(express.json());
app.use("/api/attendance", attendanceRouter);

// ✅ Only connect to DB if not testing
if (process.env.NODE_ENV !== "test") {
  const connectDB = require("./config/config");
  connectDB();
}

module.exports = app;
