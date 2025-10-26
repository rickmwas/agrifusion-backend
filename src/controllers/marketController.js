/**
 * Market Controller Module
 *
 * This module contains the business logic for market-related operations.
 * Controllers handle request processing, service calls, and response formatting
 * for market data and trends functionality.
 *
 * This controller manages market trends and pricing information.
 */

import { getMarketData } from '../services/marketService.js'; // Service for market data retrieval

/**
 * Get market trends and price data
 *
 * This function processes GET requests to /api/market/trends
 * It retrieves current market data including prices, trends, and insights
 * for various agricultural products.
 *
 * @param {Object} req - Express request object containing HTTP request data
 * @param {Object} res - Express response object for sending HTTP responses
 * @returns {Promise<void>} - Sends JSON response with market data or error
 */
export const getMarketTrends = async (req, res) => {
  try {
    // Retrieve market data from the market service
    // Currently uses mock data, but designed to work with real market APIs
    const marketData = await getMarketData();

    // Send successful response with market data
    // Response includes trends, pricing, and market insights
    res.json({
      success: true,
      data: marketData
    });

  } catch (error) {
    // Error handling for market data retrieval failures
    // Could be due to service unavailability or data processing errors
    console.error('Error in getMarketTrends:', error);
    res.status(500).json({
      error: 'Failed to get market trends',
      message: error.message
    });
  }
};
