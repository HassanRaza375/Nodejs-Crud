const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { connectDB, syncModels } = require("./models/index");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/auth");
// Load environment variables
dotenv.config();
const app = express();
// Initialize app

// CORS Configuration
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
app.use(express.json());
// Middleware
app.use(bodyParser.json());
// Connect to database
connectDB();

// Sync models
syncModels();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
