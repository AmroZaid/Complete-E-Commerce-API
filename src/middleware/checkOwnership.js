const checkOwnership = (req, res, next) => {
  const resourceUserId = parseInt(req.params.id, 10);
  const currentUserId = parseInt(req.user.id, 10);

  // Allow access if the user owns the resource or has admin privileges
  if (currentUserId === resourceUserId || req.user.role === 'admin') {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: "Access forbidden: you do not have permission to access this resource"
  });
};

module.exports = checkOwnership;