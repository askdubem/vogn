import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

// POST /api/auth/register
export const register = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return sendError(res, 'Email already registered', 400);

  const user  = await User.create({ name, email, password, phone });
  const token = generateToken(user._id, user.role);

  sendSuccess(res, { token, user }, 'Registration successful', 201);
});

// POST /api/auth/login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    return sendError(res, 'Invalid email or password', 401);
  }

  if (!user.isActive) return sendError(res, 'Account is disabled', 403);

  const token = generateToken(user._id, user.role);
  sendSuccess(res, { token, user }, 'Login successful');
});

// GET /api/auth/me  (protected)
export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  sendSuccess(res, { user });
});

// PUT /api/auth/me  (protected)
export const updateMe = asyncHandler(async (req, res) => {
  const { name, phone, address } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { name, phone, address },
    { new: true, runValidators: true }
  );
  sendSuccess(res, { user }, 'Profile updated');
});

// PUT /api/auth/change-password  (protected)
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id).select('+password');

  if (!(await user.comparePassword(currentPassword))) {
    return sendError(res, 'Current password is incorrect', 400);
  }

  user.password = newPassword;
  await user.save();
  const token = generateToken(user._id, user.role);
  sendSuccess(res, { token }, 'Password changed successfully');
});
