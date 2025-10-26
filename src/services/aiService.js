/**
 * AI Service Module
 *
 * This module handles all interactions with AI services, specifically OpenAI's API.
 * It provides intelligent responses for farming advice, market analysis, and
 * buyer timing recommendations using GPT models.
 *
 * The service includes fallback mechanisms for when the AI API is unavailable.
 */

import axios from 'axios'; // HTTP client for making API requests

/**
 * Get AI-powered farming advice using OpenAI API
 *
 * This function generates personalized farming advice based on crop type and location.
 * It constructs a detailed prompt and sends it to OpenAI's GPT model for processing.
 *
 * @param {string} crop - The type of crop (e.g., "wheat", "corn", "rice")
 * @param {string} location - The farming location (e.g., "California", "Iowa")
 * @returns {Promise<Object>} - Response object containing advice and metadata
 * @returns {string} returns.crop - The crop type from the request
 * @returns {string} returns.location - The location from the request
 * @returns {string} returns.advice - AI-generated farming advice
 * @returns {string} returns.timestamp - ISO timestamp of the response
 */
export const getAIAdvice = async (crop, location) => {
  try {
    // Construct a detailed prompt for the AI model
    // This prompt includes specific areas of farming knowledge to cover
    const prompt = `Provide farming advice for growing ${crop} in ${location}. Include information about:
    - Best planting time
    - Soil requirements
    - Water needs
    - Common pests and diseases
    - Expected yield
    - Market tips

    Keep the response concise but informative.`;

    // Make API request to OpenAI's chat completions endpoint
    // Uses GPT-3.5-turbo model which is cost-effective and capable
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo', // AI model to use
        messages: [
          {
            role: 'system', // System message sets the AI's role/behavior
            content: 'You are an expert agricultural advisor providing practical farming advice.'
          },
          {
            role: 'user', // User message contains the specific query
            content: prompt
          }
        ],
        max_tokens: 500, // Limit response length to control costs
        temperature: 0.7 // Balance creativity (0.7 is moderately creative)
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // API authentication
          'Content-Type': 'application/json' // Specify JSON content type
        }
      }
    );

    // Return structured response with AI-generated advice
    return {
      crop,
      location,
      advice: response.data.choices[0].message.content, // Extract AI response
      timestamp: new Date().toISOString() // Add timestamp for tracking
    };

  } catch (error) {
    // Handle API errors gracefully
    console.error('OpenAI API Error:', error.response?.data || error.message);

    // Provide fallback mock response when API is unavailable
    // This ensures the application continues to function even during API outages
    return {
      crop,
      location,
      advice: `Mock advice: For ${crop} in ${location}, ensure proper irrigation and soil testing. Consult local agricultural extension services for specific recommendations.`,
      timestamp: new Date().toISOString(),
      note: 'This is a fallback response due to API unavailability'
    };
  }
};

/**
 * Get AI-powered buying timing advice
 *
 * This function provides intelligent recommendations on optimal purchasing timing
 * for agricultural products based on market analysis and seasonal factors.
 * It helps buyers make informed decisions about when to purchase crops.
 *
 * @returns {Promise<Object>} - Response object containing timing advice and metadata
 * @returns {string} returns.recommendation - AI-generated timing advice
 * @returns {string} returns.timestamp - ISO timestamp of the response
 * @returns {string} returns.marketIndicator - Simple BUY/WAIT indicator
 */
export const getAITimingAdvice = async () => {
  try {
    // Create a comprehensive prompt for market timing analysis
    // This covers various factors that influence buying decisions
    const prompt = `Based on current market trends and seasonal factors, provide advice on the best timing for buyers to purchase agricultural products. Consider:
    - Current market prices
    - Seasonal availability
    - Storage costs
    - Demand patterns

    Give a clear recommendation on whether it's a good time to buy now or wait.`;

    // Send request to OpenAI API for timing analysis
    // Uses slightly lower temperature for more consistent recommendations
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system', // Set AI role as market analyst
            content: 'You are an agricultural market analyst providing timing advice for buyers.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 300, // Shorter responses for timing advice
        temperature: 0.6 // Lower temperature for more focused recommendations
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Return structured timing advice with market indicator
    return {
      recommendation: response.data.choices[0].message.content,
      timestamp: new Date().toISOString(),
      marketIndicator: Math.random() > 0.5 ? 'BUY' : 'WAIT' // Simple randomized indicator
    };

  } catch (error) {
    // Handle API failures with fallback response
    console.error('OpenAI API Error:', error.response?.data || error.message);

    // Provide mock timing advice when API is unavailable
    return {
      recommendation: 'Mock timing advice: Current market conditions suggest waiting 2-3 weeks for potentially better prices. Monitor local supply and demand.',
      timestamp: new Date().toISOString(),
      marketIndicator: 'WAIT',
      note: 'This is a fallback response due to API unavailability'
    };
  }
};
