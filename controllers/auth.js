const { User } = require("../schema/user");
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../utils/auth");
const { generateToken } = require("../utils/token");
const { initializeDB } = require("../utils/tokenLs");

module.exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({
        message: "User with this email already exists",
        success: false,
        data: null,
      });
    }

    const hashedPassword = await hashPassword(password);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const user = await User.findOne({ email });
    const newUser = {
      id: user._id,
      email: user.email,
      name: user.name,
    };
    const token = jwt.sign(newUser, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(201).json({
      message: "Signup successful",
      success: true,
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      success: false,
      data: null,
    });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user with the provided email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User with this email does not exist",
        success: false,
        data: null,
      });
    }

    // Compare the provided password with the stored password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Credentials",
        success: false,
        data: null,
      });
    }

    // Generate a token for the authenticated user
    const token = generateToken({
      id: user._id,
      email: user.email,
      name: user.name,
    });

    initializeDB(token);

    return res.status(201).json({
      message: "Login successful",
      success: true,
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      success: false,
      data: null,
    });
  }
};
