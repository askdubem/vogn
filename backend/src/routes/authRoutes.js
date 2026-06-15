import express from 'express';
import { body } from 'express-validator';
import {
  register, login, getMe, updateMe, changePassword,
} from '../controllers/authController.js';
import { protect } from '../middlewares/auth.js';
import validate from '../middlewares/validate.js';

const router = express.Router();

router.post('/register',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  validate,
  register
);

router.post('/login',
  [
    body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  validate,
  login
);

router.get('/me',    protect, getMe);
router.put('/me',    protect, updateMe);
router.put('/change-password', protect, changePassword);

export default router;
