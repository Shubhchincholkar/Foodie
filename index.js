// api/index.js
const express = require("express");
const mysql = require("mysql2");
const serverless = require("serverless-http");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MySQL Connection
const db = mysql.createConnection({
  host: "maglev.proxy.rlwy.net",
  user: "root",  
  password: "giOPnVWaKbWJumBephjhPrgiBmWsOVpq", 
  database: "railway",
  port: 34587,
});

db.connect(err => {
  if (err) {
    console.error("❌ MySQL connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL");
  }
});

// ✅ Example route
app.get("/api/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// 🚫 No app.listen() on Vercel
module.exports = app;
module.exports.handler = serverless(app);
