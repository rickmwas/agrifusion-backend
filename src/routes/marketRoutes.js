/**
 * Market Routes Module
 *
 * This module defines the API routes for market-related functionality.
 * It handles endpoints that provide market trends, pricing data,
 * and market analysis for agricultural products.
 *
 * Routes defined here are prefixed with /api/market in the main server.js
 */

// Import required modules
import express from 'express'; // Express.js framework for routing
import { getMarketTrends } from '../controllers/marketController.js'; // Controller function for market trends

// Create a new Express router instance
// This router will handle all market-related routes
const router = express.Router();

// Define routes

// GET /api/market/trends
// This endpoint returns current market trends and pricing data
// No request parameters required - returns mock market data
// Response contains trends, prices, and market insights
router.get('/trends', getMarketTrends);

// Export the router to be used in the main application
// This router is imported and mounted in server.js with the /api/market prefix
export default router;
