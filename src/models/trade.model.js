import { model, Schema } from "mongoose";

const tradeSchema = new Schema({
  utc_time: {
    type: Date,
    required: true,
  },
  operation: {
    type: String,
    enum: ['Buy', 'Sell'],
    required: true,
  },
  market: {
    type: String,
    required: true,
  },
  base_coin: {
    type: String,
    required: true,
  },
  quote_coin: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  }
}, { timestamps: true });

const Trade = model("Trade", tradeSchema);
export default Trade;
