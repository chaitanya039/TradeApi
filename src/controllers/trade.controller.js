import Trade from "../models/trade.model.js";
import fs from "fs";
import csv from "csv-parser";

// Function to parse csv into data and store it into database
const parseCSVData = async (req, res, next) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded!" });
    }

    const trades = [];

    fs.createReadStream(file.path)
      .pipe(csv())
      .on("data", (row) => {
        const [base_coin, quote_coin] = row["Market"].split("/");
        trades.push({
          utc_time: new Date(row["UTC_Time"]),
          operation: row["Operation"],
          market: row["Market"],
          base_coin,
          quote_coin,
          amount: parseFloat(row["Buy/Sell Amount"]),
          price: parseFloat(row["Price"]),
        });
      })
      .on("end", async () => {
        await Trade.insertMany(trades)
          .then(() => res.status(201).json({ message: "Trades successfully uploaded!" }))
          .catch((err) => res.status(500).send(err.message));
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

// Function to get assests wise balance of account
const getTrades = async (req, res, next) => {
  try {
    const { timestamp } = req.body;
    
    if(!timestamp) {
        return res.status(400).json({ message: "Timestamp is required!" });
    }
    
    const date = new Date(timestamp);
    
    const trades = await Trade.find({ utc_time: { $lte: date } });
    
    const balances = trades.reduce((acc, trade) => {
        const { operation, base_coin, amount } = trade;
        
        if(!acc[base_coin]) {
            acc[base_coin] = 0;
        }
        
        if(operation === "Buy") acc[base_coin] += amount;
        else if(operation === "Sell") acc[base_coin] -= amount;
        
        return acc;
    }, {});
    
    return res.status(200).json({
        data: balances,
        message: "Assets wise trades fetched successfully!"
    });
    
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

export { parseCSVData, getTrades };
