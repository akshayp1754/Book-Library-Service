const ls = require('local-storage');

// Function to initialize the database with the token
module.exports.initializeDB = (token) => {
  //  "token" is the key to store the token in local storage
  ls.set('token', token);
  console.log('Token stored in local storage ' + (token))
};


