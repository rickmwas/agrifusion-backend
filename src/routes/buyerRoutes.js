/**
 * Buyer Routes Module
 *
 * This module defines the API routes for buyer-related functionality.
 * It handles endpoints that provide timing advice and recommendations
 * for buyers looking to purchase agricultural products at optimal times.
 *
 * Routes defined here are prefixed with /api/buyer in the main server.js
 */

// Import required modules
import express from 'express'; // Express.js framework for routing
import { getBuyerTiming } from '../controllers/buyerController.js'; // Controller function for buyer timing advice

// Create a new Express router instance
// This router will handle all buyer-related routes
const router = express.Router();

// Define routes

// GET /api/buyer/timing
// This endpoint returns AI-powered advice on optimal buying timing
// No request parameters required - analyzes current market conditions
// Response contains timing recommendations and market indicators
router.get('/timing', getBuyerTiming);

// Export the router to be used in the main application
// This router is imported and mounted in server.js with the /api/buyer prefix
export default router;
