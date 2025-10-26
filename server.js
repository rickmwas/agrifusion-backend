/**
 * AgriFusion Backend Server
 *
 * This is the main entry point for the AgriFusion backend application.
 * It sets up an Express.js server with middleware, routes, and error handling
 * for an AI-powered agriculture marketplace platform.
 *
 * Architecture: This application follows a modular structure with:
 * - Routes: Define API endpoints
 * - Controllers: Handle business logic
 * - Services: Manage external integrations (OpenAI, weather, market data)
 * - Config: Store configuration settings
 */

// Import required modules
import express from "express"; // Web framework for Node.js
import cors from "cors"; // Enable Cross-Origin Resource Sharing
import dotenv from "dotenv"; // Load environment variables from .env file

// Load environment variables from .env file
// This must be done before using any process.env variables
dotenv.config();

// Create Express application instance
const app = express();

// Middleware setup
// CORS middleware allows requests from different origins (important for frontend integration)
app.use(cors());

// JSON parsing middleware - converts incoming JSON requests to JavaScript objects
app.use(express.json());

// Import route modules
// Each route module defines endpoints for different features of the application
import farmerRoutes from "./src/routes/farmerRoutes.js"; // Routes for farmer advice endpoints
import marketRoutes from "./src/routes/marketRoutes.js"; // Routes for market trends endpoints
import buyerRoutes from "./src/routes/buyerRoutes.js"; // Routes for buyer timing endpoints

// Register routes with the Express app
// All routes are prefixed with /api to organize API endpoints
// The prefix helps distinguish API routes from other potential routes
app.use("/api/farmer", farmerRoutes); // Farmer-related endpoints: /api/farmer/*
app.use("/api/market", marketRoutes); // Market-related endpoints: /api/market/*
app.use("/api/buyer", buyerRoutes); // Buyer-related endpoints: /api/buyer/*

// Define API endpoints

// Root endpoint - provides API information and available endpoints
// This is a GET request to the base URL that returns metadata about the API
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to AgriFusion Backend!",
    version: "1.0.0",
    endpoints: {
      farmer: "/api/farmer/advice", // POST endpoint for farming advice
      market: "/api/market/trends", // GET endpoint for market trends
      buyer: "/api/buyer/timing" // GET endpoint for buyer timing advice
    }
  });
});

// Error handling middleware
// This catches any errors that occur during request processing
// It logs the error and sends a generic error response to the client
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the full error stack for debugging
  res.status(500).json({ error: "Something went wrong!" }); // Send 500 status with error message
});

// 404 handler - catches requests to non-existent routes
// This middleware runs after all other routes, so if no route matches, it returns 404
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Server configuration and startup
// Get port from environment variable or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server and listen on the specified port
// The callback function runs once the server is successfully started
app.listen(PORT, () => {
  console.log(`🚀 AgriFusion Backend server is running on port ${PORT}`);
  console.log(`📚 API Documentation available at http://localhost:${PORT}`);
});
