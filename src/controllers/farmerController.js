/**
 * Farmer Controller Module
 *
 * This module contains the business logic for farmer-related operations.
 * Controllers act as intermediaries between routes and services, handling
 * request validation, response formatting, and error management.
 *
 * This controller specifically handles farming advice requests.
 */

import { getAIAdvice } from '../services/aiService.js'; // Service for AI-powered advice generation

/**
 * Get farming advice for a specific crop and location
 *
 * This function processes POST requests to /api/farmer/advice
 * It validates input parameters, calls the AI service for advice generation,
 * and formats the response for the client.
 *
 * @param {Object} req - Express request object containing HTTP request data
 * @param {Object} req.body - Request body with farming parameters
 * @param {string} req.body.crop - The type of crop (e.g., "wheat", "corn")
 * @param {string} req.body.location - The farming location (e.g., "California", "Iowa")
 * @param {Object} res - Express response object for sending HTTP responses
 * @returns {Promise<void>} - Sends JSON response with advice or error
 */
export const getFarmerAdvice = async (req, res) => {
  try {
    // Extract parameters from request body
    // These come from the JSON payload sent by the client
    const { crop, location } = req.body;

    // Input validation - ensure required fields are present
    // This prevents errors and provides clear feedback to the client
    if (!crop || !location) {
      return res.status(400).json({
        error: 'Missing required fields: crop and location are required'
      });
    }

    // Call the AI service to generate farming advice
    // This is an async operation that may take time due to API calls
    const advice = await getAIAdvice(crop, location);

    // Send successful response with standardized format
    // Always include success flag and data wrapper for consistency
    res.json({
      success: true,
      data: advice
    });

  } catch (error) {
    // Error handling - catch any exceptions during processing
    // Log the error for debugging while sending user-friendly message
    console.error('Error in getFarmerAdvice:', error);
    res.status(500).json({
      error: 'Failed to get farming advice',
      message: error.message
    });
  }
};
