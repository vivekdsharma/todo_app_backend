const express= require('express');
const app=express();
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");


app.use(express.json());
app.use(cors());



connectDB();



app.use("/api/auth", require("./routes/authRoutes"));


const taskRoutes = require("./routes/taskRoutes");

app.use("/api/tasks", taskRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));