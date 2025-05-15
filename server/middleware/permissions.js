const checkPermission = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user.userId);
      
      if (user.role === 'admin') {
        return next();
      }

      if (user.permissions.includes(requiredPermission)) {
        return next();
      }

      res.status(403).json({ message: 'Permission denied' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
};

module.exports = { checkPermission };