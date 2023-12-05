import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./connectDB.js";
import studentRoutes from "./routes/studentRoutes.js"
import userRoutes from "./routes/userRoutes.js"

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// app.use('/',(req, res) => {
//     res.send("This is a student management system!!")
// })

app.use("/user", userRoutes);
app.use("/student", studentRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
