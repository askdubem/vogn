import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import { sendError } from '../utils/apiResponse.js';
import User from '../models/User.js';

/**
 * Protect routes — requires valid JWT
 */
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return sendError(res, 'Not authenticated. Please log in.', 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || !user.isActive) {
      return sendError(res, 'User no longer exists or is inactive.', 401);
    }

    req.user = user;
    next();
  } catch {
    return sendError(res, 'Invalid or expired token.', 401);
  }
});

/**
 * Restrict to admin only — must come after protect
 */
export const adminOnly = asyncHandler(async (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return sendError(res, 'Access denied. Admins only.', 403);
  }
  next();
});
