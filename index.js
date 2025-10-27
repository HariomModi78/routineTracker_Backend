const express = require("express");
const cors = require("cors");
const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.listen(3000);
require("./config/dbConnection");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const { notFound } = require("./middlewares/errorHandler");

app.use("/auth",authRoutes);
app.use("/task",taskRoutes);

app.use(notFound)
