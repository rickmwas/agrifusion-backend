/**
 * Farmer Routes Module
 *
 * This module defines the API routes for farmer-related functionality.
 * It handles endpoints that provide farming advice and recommendations
 * to farmers based on their crop type and location.
 *
 * Routes defined here are prefixed with /api/farmer in the main server.js
 */

// Import required modules
import express from 'express'; // Express.js framework for routing
import { getFarmerAdvice } from '../controllers/farmerController.js'; // Controller function for farmer advice

// Create a new Express router instance
// This router will handle all farmer-related routes
const router = express.Router();

// Define routes

// POST /api/farmer/advice
// This endpoint receives farming parameters and returns AI-powered advice
// Request body should contain: { crop: string, location: string }
// Response contains AI-generated farming advice
router.post('/advice', getFarmerAdvice);

// Export the router to be used in the main application
// This router is imported and mounted in server.js with the /api/farmer prefix
export default router;
