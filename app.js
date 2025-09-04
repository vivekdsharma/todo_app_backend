const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
const app = express();

// ✅ Connect to Database
connectDB();

// ✅ Middleware
app.use(express.json());

// ✅ Configure CORS properly
const cors = require("cors");

app.use(
  cors({
    origin: [
      "https://to-do-app-by-vivek.netlify.app", // Netlify frontend
      "http://localhost",
      "https://localhost",
      "capacitor://localhost", // Capacitor app
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Handle Preflight Requests
app.options("*", (req, res) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://to-do-app-by-vivek.netlify.app"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});

// ✅ Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
