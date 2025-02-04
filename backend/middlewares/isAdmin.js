const User = require("../models/User/User");
const asyncHandler = require("express-async-handler");

const isAdmin = asyncHandler(async (req, res, next) => {
  try {
    
    const user = await User.findById(req.user);
    
    if (!user?.role !== 'admin') {
      return res.status(401).json({
        message: "Access denied, admin only",
      });
    }
    next();
  } catch (error) {
    return res.json(error);
  }
});

module.exports = isAdmin;