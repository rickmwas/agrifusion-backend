/**
 * OpenAI Configuration Module
 *
 * This module centralizes all configuration and utility functions related to
 * OpenAI API integration for the AgriFusion application. It provides:
 * - API configuration settings
 * - API key validation
 * - System prompts for different AI use cases
 * - Centralized management of OpenAI-related settings
 */

// OpenAI API configuration object
// Contains default settings for all OpenAI API calls in the application
export const openaiConfig = {
  apiUrl: 'https://api.openai.com/v1/chat/completions', // OpenAI chat completions endpoint
  model: 'gpt-3.5-turbo', // AI model to use (cost-effective and capable)
  maxTokens: 500, // Maximum tokens in response (controls cost and length)
  temperature: 0.7 // Creativity level (0.7 balances creativity and consistency)
};

/**
 * Validate OpenAI API key
 *
 * This function checks if the OpenAI API key is properly configured
 * in the environment variables. It performs basic validation to ensure
 * the key exists and has the correct format.
 *
 * @returns {boolean} - True if API key is valid and configured, false otherwise
 */
export const validateApiKey = () => {
  const apiKey = process.env.OPENAI_API_KEY;

  // Check if API key environment variable exists
  if (!apiKey) {
    console.warn('OPENAI_API_KEY not found in environment variables');
    return false;
  }

  // Validate API key format (OpenAI keys start with 'sk-')
  if (!apiKey.startsWith('sk-')) {
    console.warn('OPENAI_API_KEY appears to be invalid (should start with "sk-")');
    return false;
  }

  return true;
};

/**
 * Default system prompts for different AI use cases
 *
 * These prompts define the AI's role and behavior for different types of
 * agricultural queries. They help ensure consistent and relevant responses
 * across different features of the application.
 */
export const systemPrompts = {
  farming: 'You are an expert agricultural advisor providing practical farming advice based on crop type, location, and current agricultural best practices.',
  market: 'You are an agricultural market analyst providing insights on market trends, pricing, and buying/selling timing.',
  general: 'You are a helpful AI assistant specialized in agriculture and farming.'
};
