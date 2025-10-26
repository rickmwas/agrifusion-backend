/**
 * Weather Service Module
 *
 * This module provides weather-related data and alerts for agricultural purposes.
 * Currently implements mock data for development and testing purposes.
 *
 * In a production environment, this would integrate with real weather APIs
 * such as OpenWeatherMap, WeatherAPI, or AccuWeather to provide accurate
 * weather forecasts and alerts for farming decisions.
 */

/**
 * Get weather data for a location
 *
 * This function returns current weather conditions and forecast data
 * for a specified location. The data includes temperature, humidity,
 * rainfall, and weather conditions that are relevant for farming.
 *
 * @param {string} location - The location to get weather data for (e.g., "California", "Iowa")
 * @returns {Promise<Object>} - Weather data object with current conditions and forecast
 * @returns {string} returns.location - The requested location
 * @returns {number} returns.temperature - Current temperature in Celsius
 * @returns {number} returns.humidity - Humidity percentage
 * @returns {number} returns.rainfall - Rainfall in millimeters
 * @returns {string} returns.conditions - Current weather conditions
 * @returns {Array} returns.forecast - Array of forecast objects for next few days
 * @returns {string} returns.lastUpdated - ISO timestamp of last update
 */
export const getWeatherData = async (location) => {
  // Generate mock weather data for development
  // In production, this would make API calls to weather services
  const mockWeatherData = {
    location,
    temperature: Math.floor(Math.random() * 30) + 10, // Random temp between 10-40°C
    humidity: Math.floor(Math.random() * 50) + 30, // Random humidity 30-80%
    rainfall: Math.floor(Math.random() * 20), // Random rainfall 0-20mm
    conditions: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)], // Random condition
    forecast: [
      { day: 'Today', temp: 25, condition: 'Sunny' },
      { day: 'Tomorrow', temp: 23, condition: 'Cloudy' },
      { day: 'Day 3', temp: 22, condition: 'Rainy' }
    ],
    lastUpdated: new Date().toISOString()
  };

  return mockWeatherData;
};

/**
 * Get weather alerts for farming
 *
 * This function returns weather alerts and warnings that could impact
 * agricultural activities. Alerts include information about extreme weather
 * conditions that farmers should be aware of.
 *
 * @param {string} location - The location to check for weather alerts
 * @returns {Promise<Array>} - Array of weather alert objects
 * @returns {string} returns[].type - Alert type ('warning', 'info', 'alert')
 * @returns {string} returns[].message - Alert message describing the weather condition
 * @returns {string} returns[].severity - Severity level ('low', 'moderate', 'high')
 */
export const getWeatherAlerts = async (location) => {
  // Mock weather alerts for development
  // In production, this would fetch real alerts from weather services
  const alerts = [
    {
      type: 'warning',
      message: 'Heavy rainfall expected in the next 48 hours. Prepare for waterlogging.',
      severity: 'moderate'
    },
    {
      type: 'info',
      message: 'Temperature dropping below optimal range for crop growth.',
      severity: 'low'
    }
  ];

  return alerts;
};
