const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, "mySecureToken", { expiresIn: "2h" });
};

module.exports = generateToken;
