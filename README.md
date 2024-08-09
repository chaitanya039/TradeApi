Here's a README file that you can use for the project:

---

# Cryptocurrency Trade API

This API provides functionalities for uploading cryptocurrency trade data via a CSV file and querying the balance of various cryptocurrencies at a specific timestamp.

## Hosted URL

The API is currently hosted at: [https://tradeapi-8e70.onrender.com/](https://tradeapi-8e70.onrender.com/)

## Table of Contents

- [Features](#features)
- [Endpoints](#endpoints)
  - [Upload Trades CSV](#upload-trades-csv)
  - [Get Asset-Wise Balance](#get-asset-wise-balance)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [License](#license)

## Features

- **Upload CSV**: Accepts a CSV file containing cryptocurrency trades and stores the data in a MongoDB database.
- **Fetch Balance**: Retrieves the balance of each cryptocurrency at a given timestamp.

## Endpoints

### 1. Upload Trades CSV

**URL:** `/api/trades/upload`

**Method:** `POST`

**Description:** Upload a CSV file containing trade data. The file should have the following columns:
- `UTC_Time`: Timestamp of the trade.
- `Operation`: Buy or Sell.
- `Market`: Market in which the trade occurred, formatted as `BASE/QUOTE` (e.g., `BTC/INR`).
- `Buy/Sell Amount`: Quantity of the base coin being bought or sold.
- `Price`: Price of the base coin in terms of the quote coin.

**Request:**

- **Content-Type:** `multipart/form-data`
- **File:** The CSV file containing the trade data.

**Response:**
- **201 Created:** `{"message": "Trades successfully uploaded!"}`
- **400 Bad Request:** `{"error": "No file uploaded"}` if no file is provided.
- **500 Internal Server Error:** If an error occurs during file processing or data insertion.

**Example:**
```bash
curl -X POST -F 'file=@/path/to/your/file.csv' https://tradeapi-8e70.onrender.com/api/trades/upload
```

### 2. Get Asset-Wise Balance

**URL:** `/api/balance`

**Method:** `POST`

**Description:** Get the balance of each cryptocurrency at a specific timestamp.

**Request:**

- **Content-Type:** `application/json`
- **Body:**
  ```json
  {
    "timestamp": "YYYY-MM-DD HH:MM:SS"
  }
  ```

**Response:**
- **200 OK:** A JSON object representing the balance of each cryptocurrency.
- **400 Bad Request:** If the timestamp is not provided or is invalid.
- **500 Internal Server Error:** If an error occurs while fetching the data.

**Example:**
```bash
curl -X POST -H "Content-Type: application/json" -d '{"timestamp": "2022-09-28 12:00:00"}' https://tradeapi-8e70.onrender.com/api/balance
```

**Example Response:**
```json
{
  "BTC": 15,
  "MATIC": 100
}
```

## Installation

To run this project locally:

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/trade-api.git
    cd trade-api
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Set up a `.env` file with the following variables:
    ```env
    MONGODB_URI=mongodb://localhost:27017/crypto-trade-api
    PORT=3000
    ```

4. Start the server:
    ```bash
    node index.js
    ```

5. The API will be available at `http://localhost:3000`.

## Usage

- Use the `/api/trades/upload` endpoint to upload a CSV file with your trade data.
- Use the `/api/balance` endpoint to retrieve the asset-wise balance at a given timestamp.

## Technologies Used

- **Node.js**: JavaScript runtime.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database.
- **Mongoose**: ODM for MongoDB.
- **Multer**: Middleware for handling file uploads.
- **csv-parser**: Stream-based CSV parsing.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---
