const User = require("../models/User/User");
const asyncHandler = require("express-async-handler");

const isBlocked = asyncHandler(async (req, res, next) => {
  try {
    
    const user = await User.findById(req.user);
    
    if (user?.isBlocked) {
      return res.status(401).json({
        message: "Account is blocked, plase contact admin",
      });
    }
    next();
  } catch (error) {
    return res.json(error);
  }
});

module.exports = isBlocked;