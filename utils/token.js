const jwt = require("jsonwebtoken");

// Function to verify the authenticity of a JWT token
module.exports.verifyAuthToken = (token) => {
  try {
    // Verify the token using the SECRET_KEY from environment variables
    const payload = jwt.verify(token, process.env.JWT_SECRET );
    return payload;
  } catch (error) {
    // Return false if the token is invalid or has expired
    return false;
  }
};

// Function to generate a new JWT token
module.exports.generateToken = (payload) => {
  // Sign the payload with the SECRET_KEY and set an expiration time of 1 hour
  return jwt.sign(payload, process.env.JWT_SECRET , { expiresIn: "1h" });
};
