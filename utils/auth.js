const bcrypt = require('bcrypt');

// Function to hash a plain text password
module.exports.hashPassword = async (password) => {
    // Generate a salt with 10 rounds
    const salt = await bcrypt.genSalt(10);
    
    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);
    
    return hashedPassword;
}

// Function to compare a plain text password with a hashed password
module.exports.comparePassword = async (password, hashedPassword) => {
    // Compare the plain text password with the hashed password
    const isMatch = await bcrypt.compare(password, hashedPassword);
    
    return isMatch;
}
