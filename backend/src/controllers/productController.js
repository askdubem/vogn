import Product from '../models/Product.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

// GET /api/products
export const getProducts = asyncHandler(async (req, res) => {
  const {
    category, search, featured, bestseller,
    sort = '-createdAt', page = 1, limit = 12,
    minPrice, maxPrice,
  } = req.query;

  const filter = { isActive: true };

  if (category)   filter.category   = category;
  if (featured)   filter.isFeatured = featured === 'true';
  if (bestseller) filter.isBestseller = bestseller === 'true';

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  if (search) {
    filter.$text = { $search: search };
  }

  const skip  = (Number(page) - 1) * Number(limit);
  const total = await Product.countDocuments(filter);

  const products = await Product.find(filter)
    .populate('category', 'name slug')
    .sort(sort)
    .skip(skip)
    .limit(Number(limit));

  sendSuccess(res, {
    products,
    pagination: {
      total,
      page:       Number(page),
      limit:      Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    },
  });
});

// GET /api/products/:slug
export const getProductBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug, isActive: true })
    .populate('category', 'name slug');
  if (!product) return sendError(res, 'Product not found', 404);
  sendSuccess(res, { product });
});

// GET /api/products/id/:id
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate('category', 'name slug');
  if (!product) return sendError(res, 'Product not found', 404);
  sendSuccess(res, { product });
});

// POST /api/products  (admin)
export const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  await product.populate('category', 'name slug');
  sendSuccess(res, { product }, 'Product created', 201);
});

// PUT /api/products/:id  (admin)
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true, runValidators: true,
  }).populate('category', 'name slug');
  if (!product) return sendError(res, 'Product not found', 404);
  sendSuccess(res, { product }, 'Product updated');
});

// DELETE /api/products/:id  (admin)
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id, { isActive: false }, { new: true }
  );
  if (!product) return sendError(res, 'Product not found', 404);
  sendSuccess(res, {}, 'Product deleted');
});

// GET /api/products/:id/related
export const getRelatedProducts = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return sendError(res, 'Product not found', 404);

  const related = await Product.find({
    category: product.category,
    _id: { $ne: product._id },
    isActive: true,
  }).limit(4).populate('category', 'name slug');

  sendSuccess(res, { products: related });
});
