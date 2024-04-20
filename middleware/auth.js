// middleware/auth.js

export function isAdmin(req, res, next) {
    if (req.user && req.user.roles.includes('admin')) {
      return next();
    }
    res.status(403).json({ error: 'Unauthorized' });
  }
  