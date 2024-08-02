// Import Price model
const Price = require('../models/price.models')

// Define the PriceList controller function
const PriceList = async (req, res) => {
  // Extract the symbol, page, and limit from the query
  const { symbol, page = 1, limit = 20 } = req.query;

  // Try to fetch the prices from the database
  try {
    let query = {};
    if (symbol) {
      query.symbol = symbol;
    }

    // Fetch the prices based on the query
    const prices = await Price.find(query)
      .sort({ timestamp: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .exec();

    // Fetch the total number of prices
    const total = await Price.countDocuments(query).exec();

    // Return the prices as a JSON response
    res.status(200).json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      prices,
    });
  } catch (error) {
    console.error('Error fetching prices:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { PriceList }