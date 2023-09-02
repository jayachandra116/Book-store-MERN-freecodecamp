import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";

import booksRouter from "./routes/booksRoute.js";

const app = express();

// middleware to parsing request body
app.use(express.json());

// middleware to allow cors policy
// allow everything
// app.use(cors())
// allow only certain methods
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use("/books", booksRouter);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("Successfully connected to database.");
    app.listen(PORT, () => {
      console.log(`App is listening on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
