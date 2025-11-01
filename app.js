require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));


// MySQL connection
const db = mysql.createConnection({
  host: "maglev.proxy.rlwy.net",
  user: "root",  
  password: "giOPnVWaKbWJumBephjhPrgiBmWsOVpq", 
  database: "railway",
  port: 34587,
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err);
    process.exit(1); // stop server if DB fails
  }
  console.log("✅ MySQL connected!");
});

// Your route
app.post("/submit-order", (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    phone,
    email,
    address,
    foodItem,
    quantity,
    instructions,
  } = req.body;

  const foodPrices = {
    "Double Beef Burger": 249,
    "Veggie Pizza": 199,
    "Fried Chicken": 179,
    "Chicken Roll": 149,
    "Sub Sandwich": 129,
    "Chicken Lasagna": 229,
    "Italian Spaghetti": 159,
    "Spring Roll": 99,
  };

  const unitPrice = foodPrices[foodItem];
  if (!unitPrice) {
    return res.status(400).json({ error: "Invalid food item selected." });
  }

  const totalPrice = unitPrice * parseInt(quantity);

  const query = `
    INSERT INTO orders 
    (firstName, middleName, lastName, phone, email, address, foodItem, quantity, unitPrice, totalPrice, instructions) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [
      firstName,
      middleName,
      lastName,
      phone,
      email,
      address,
      foodItem,
      quantity,
      unitPrice,
      totalPrice,
      instructions,
    ],
    (err) => {
      if (err) {
        console.error("❌ MySQL insert error:", err);
        return res.status(500).json({ error: "Database error." });
      }
      return res.status(200).json({
        message: "Order placed successfully!",
        unitPrice,
        totalPrice,
      });
    }
  );
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// end
