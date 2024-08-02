require('dotenv').config();

// Importing libraries 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');

// Importing routes
const priceRoutes = require('./routes/price.routes');

// Importing models
const Price = require('./models/price.models');

// Creating an express app
const app = express();

// Port
const port = process.env.PORT || 8080;

// Middleware
app.use(cors());

// Body parser
app.use(express.json());

// Routes
app.use('/prices', priceRoutes)

const fetchCryptoData = async () => {
  const symbols = ['binancecoin', 'bitcoin', 'ethereum', 'tether', 'solana'];
  const symbolString = symbols.join(',');
  const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
    params: {
      ids: symbolString,
      vs_currencies: 'usd',
    },
    headers: {
      'x-cg-demo-api-key': `${process.env.API_KEY}`
    }
  });

  for (const symbol of symbols) {
    const price = response.data[symbol].usd;
    const priceData = { symbol, price };
    await Price.create(priceData);
  }
};

// Set interval to fetch crypto data every 5 seconds
setInterval(fetchCryptoData, 5000);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(port, () => {
      console.log("Server running on the port ", port);
    });
  })
  .catch((error) => {
    console.log(error);
  })