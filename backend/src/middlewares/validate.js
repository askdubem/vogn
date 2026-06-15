import { validationResult } from 'express-validator';
import { sendError } from '../utils/apiResponse.js';

/**
 * Run after express-validator rules
 * Returns 400 with error details if validation fails
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendError(
      res,
      'Validation failed',
      400,
      errors.array().map(e => ({ field: e.path, message: e.msg }))
    );
  }
  next();
};

export default validate;
