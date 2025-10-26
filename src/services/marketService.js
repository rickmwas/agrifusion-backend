/**
 * Market Service Module
 *
 * This module provides market data, pricing information, and trends for agricultural products.
 * Currently implements mock data for development and testing purposes.
 *
 * In a production environment, this would integrate with real market data APIs
 * such as agricultural commodity exchanges, government agricultural data services,
 * or financial market data providers to provide accurate pricing and trends.
 */

/**
 * Get market trends and price data
 *
 * This function returns comprehensive market data including current prices,
 * trends, regional pricing, and market insights for various agricultural crops.
 * The data helps farmers and buyers make informed decisions about pricing and timing.
 *
 * @returns {Promise<Object>} - Comprehensive market data object
 * @returns {string} returns.timestamp - ISO timestamp of the data
 * @returns {Array} returns.trends - Array of crop trend objects with pricing data
 * @returns {Array} returns.regionalPrices - Array of regional pricing data
 * @returns {Object} returns.marketInsights - Market analysis and recommendations
 */
export const getMarketData = async () => {
  // Define sample crops and locations for mock data generation
  const crops = ['Wheat', 'Rice', 'Corn', 'Soybeans', 'Cotton'];
  const locations = ['California', 'Texas', 'Iowa', 'Kansas', 'Illinois'];

  // Generate mock market data with realistic price ranges
  const marketData = {
    timestamp: new Date().toISOString(),
    trends: crops.map(crop => ({
      crop,
      currentPrice: Math.floor(Math.random() * 200) + 100, // Random price $100-300 per unit
      priceChange: (Math.random() - 0.5) * 20, // Random change -10 to +10
      trend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)], // Random trend direction
      volume: Math.floor(Math.random() * 10000) + 1000 // Random trading volume
    })),
    regionalPrices: locations.map(location => ({
      location,
      averagePrice: Math.floor(Math.random() * 150) + 80, // Regional average price
      topCrops: crops.slice(0, 3).map(crop => ({
        crop,
        price: Math.floor(Math.random() * 100) + 50 // Price for top crops in region
      }))
    })),
    marketInsights: {
      overallTrend: 'Prices are stable with slight upward movement expected',
      bestTimeToSell: 'Next 2-3 weeks',
      recommendedActions: [
        'Monitor weather patterns closely',
        'Consider storage options for surplus',
        'Explore contract farming opportunities'
      ]
    }
  };

  return marketData;
};

/**
 * Get price history for a specific crop
 *
 * This function returns historical price data for a specific crop over a given period.
 * The data includes daily prices and trading volumes, useful for trend analysis
 * and price forecasting.
 *
 * @param {string} crop - The name of the crop to get price history for
 * @param {number} [days=30] - Number of days of historical data to retrieve (default: 30)
 * @returns {Promise<Object>} - Price history data object
 * @returns {string} returns.crop - The crop name
 * @returns {Array} returns.history - Array of daily price data points
 * @returns {string} returns.period - Description of the time period covered
 */
export const getPriceHistory = async (crop, days = 30) => {
  const history = [];
  let basePrice = Math.floor(Math.random() * 100) + 100; // Starting price

  // Generate historical price data for each day in the period
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    // Simulate realistic price fluctuations
    basePrice += (Math.random() - 0.5) * 10; // Random daily change
    basePrice = Math.max(50, Math.min(300, basePrice)); // Keep within realistic bounds

    history.push({
      date: date.toISOString().split('T')[0], // Date in YYYY-MM-DD format
      price: Math.round(basePrice * 100) / 100, // Price rounded to 2 decimal places
      volume: Math.floor(Math.random() * 5000) + 500 // Random trading volume
    });
  }

  return {
    crop,
    history,
    period: `${days} days`
  };
};
