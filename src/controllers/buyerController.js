/**
 * Buyer Controller Module
 *
 * This module contains the business logic for buyer-related operations.
 * Controllers manage request processing and response formatting for
 * buyer timing advice and purchasing recommendations.
 *
 * This controller handles AI-powered timing advice for buyers.
 */

import { getAITimingAdvice } from '../services/aiService.js'; // Service for AI timing recommendations

/**
 * Get AI-powered advice on buying timing
 *
 * This function processes GET requests to /api/buyer/timing
 * It provides intelligent recommendations on optimal timing for purchasing
 * agricultural products based on market conditions and trends.
 *
 * @param {Object} req - Express request object containing HTTP request data
 * @param {Object} res - Express response object for sending HTTP responses
 * @returns {Promise<void>} - Sends JSON response with timing advice or error
 */
export const getBuyerTiming = async (req, res) => {
  try {
    // Retrieve AI-powered timing advice from the service
    // This analyzes current market conditions to provide buying recommendations
    const timingAdvice = await getAITimingAdvice();

    // Send successful response with timing advice
    // Response includes recommendations, market indicators, and timing guidance
    res.json({
      success: true,
      data: timingAdvice
    });

  } catch (error) {
    // Error handling for timing advice retrieval failures
    // Could be due to AI service unavailability or processing errors
    console.error('Error in getBuyerTiming:', error);
    res.status(500).json({
      error: 'Failed to get buying timing advice',
      message: error.message
    });
  }
};
