Trade.insertMany(trades)
          .then(() => res.status(201).send("Trades successfully uploaded!"))
          .catch(