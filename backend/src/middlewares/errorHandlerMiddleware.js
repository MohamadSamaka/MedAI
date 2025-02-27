const JsonedResponseError = require('../errors/JsonedResponseError');

function errorHandlerMiddleware(err, req, res, next) {
  // If the error has a toJSON method (like JsonedResponseError), use it.
  if (err && typeof err.toJSON === 'function') {
    return res.status(err.statusCode || 500).json(err.toJSON());
  }
  
  // Handle Mongoose validation errors (or similar)
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({
      message: "Validation Error",
      details: messages,
    });
  }
  
  // Other specific error types can be handled here...
  // For example, if you have a CastError from Mongoose when an invalid ObjectId is provided:
  if (err.name === 'CastError') {
    return res.status(400).json({
      message: "Invalid resource identifier",
    });
  }
  
  // Fallback for unknown errors
  const response = {
    message: err.message || 'Internal Server Error'
  };

  
  if (process.env.NODE_ENV !== 'production') {
    response.stack = err.stack;
  }

  res.status(err.statusCode || 500).json(response);
}

module.exports = errorHandlerMiddleware;
