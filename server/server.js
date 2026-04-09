require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());

/* Test Route */
app.get("/", (req, res) => {
  res.send("Server Running Successfully 🚀");
});

/* Subscription API */
app.post("/subscribe", (req, res) => {
  try {
    const { name, email, plan, duration, payment, autoRenew } = req.body;

    // Validation
    if (!name || !email || !plan || !duration || !payment) {
      return res.status(400).json({
        message: "All fields are required ❌"
      });
    }

    // Console log (for testing)
    console.log("New Subscription:", req.body);

    // Response
    res.status(200).json({
      message: "Subscription Successful ✅"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error ❌"
    });
  }
});

/* PORT */
const PORT = process.env.PORT || 3000;

/* Start Server */
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});