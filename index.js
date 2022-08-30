import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import plantsRoute from "./routes/plants.js";
import usersRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import cors from "cors";
import cookieParser from "cookie-parser";
const PORT = process.env.PORT || 8800;
const app = express();
dotenv.config();

const connect = async () => {
  try {
    mongoose.connect(process.env.DB_CONNECTION);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("DB Disconnected ");
});

mongoose.connection.on("connected", () => {
  console.log("DB Connected");
});

app.get("/", (req, res) => {
  res.send(`Plantae API connected on port ${PORT}`);
});

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000", "https://plantae-ten.vercel.app/"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/plants", plantsRoute);
app.use("/api/users", usersRoute);
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(PORT, (req, res) => {
  connect();
  console.log(`Connection established on port ${PORT}`);
});
