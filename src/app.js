import express from "express";

const app = express();

// Middlewares
app.use(express.json({ limit:"16kb" }));
app.use(express.urlencoded({ extended : true, limit : "16kb" }));
app.use(express.static("public"));

// Importing routers
import tradeRouter from "./Routes/trade.route.js";

// Home page for everyone
app.get("/", (req, res) => {
    return res.status(200).send("Welcome, to my project <br> got to this /api/v1/trades for saving and fetching trades!")
});

// Routes
app.use("/api/v1/trades", tradeRouter);

export default app;