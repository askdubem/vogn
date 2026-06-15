import Category from '../models/Category.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

// GET /api/categories
export const getCategories = asyncHandler(async (_req, res) => {
  const categories = await Category.find({ isActive: true }).sort('sortOrder name');
  sendSuccess(res, { categories, count: categories.length });
});

// GET /api/categories/:slug
export const getCategoryBySlug = asyncHandler(async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug, isActive: true });
  if (!category) return sendError(res, 'Category not found', 404);
  sendSuccess(res, { category });
});

// POST /api/categories  (admin)
export const createCategory = asyncHandler(async (req, res) => {
  const { name, slug, description, image, sortOrder } = req.body;
  const category = await Category.create({ name, slug, description, image, sortOrder });
  sendSuccess(res, { category }, 'Category created', 201);
});

// PUT /api/categories/:id  (admin)
export const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true, runValidators: true,
  });
  if (!category) return sendError(res, 'Category not found', 404);
  sendSuccess(res, { category }, 'Category updated');
});

// DELETE /api/categories/:id  (admin)
export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id, { isActive: false }, { new: true }
  );
  if (!category) return sendError(res, 'Category not found', 404);
  sendSuccess(res, {}, 'Category deleted');
});
