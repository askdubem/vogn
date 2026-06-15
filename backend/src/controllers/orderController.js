import Order from '../models/Order.js';
import Product from '../models/Product.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';
import { SHIPPING_LAGOS, SHIPPING_NATIONWIDE, FREE_SHIPPING_THRESHOLD } from '../config/constants.js';

// POST /api/orders
export const createOrder = asyncHandler(async (req, res) => {
  const { items, shippingAddress, paymentMethod = 'paystack' } = req.body;

  if (!items || items.length === 0) {
    return sendError(res, 'No order items provided', 400);
  }

  // Verify products and build order items
  const orderItems = [];
  let subtotal = 0;

  for (const item of items) {
    const product = await Product.findById(item.product);
    if (!product || !product.isActive) {
      return sendError(res, `Product not found: ${item.product}`, 404);
    }
    if (product.stock < item.quantity) {
      return sendError(res, `Insufficient stock for: ${product.name}`, 400);
    }

    const itemPrice = product.discountPrice ?? product.price;
    subtotal += itemPrice * item.quantity;

    orderItems.push({
      product:       product._id,
      name:          product.name,
      image:         product.images?.[0] || '',
      price:         product.price,
      discountPrice: product.discountPrice,
      quantity:      item.quantity,
      selectedColor: item.selectedColor || null,
      selectedSize:  item.selectedSize  || null,
    });
  }

  // Calculate shipping
  const isLagos    = shippingAddress.state === 'Lagos';
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD
    ? 0
    : isLagos ? SHIPPING_LAGOS : SHIPPING_NATIONWIDE;

  const totalAmount = subtotal + shippingFee;

  const order = await Order.create({
    user:            req.user?._id || null,
    items:           orderItems,
    shippingAddress,
    subtotal,
    shippingFee,
    totalAmount,
    paymentMethod,
  });

  // Deduct stock
  for (const item of items) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: { stock: -item.quantity },
    });
  }

  sendSuccess(res, { order }, 'Order placed successfully', 201);
});

// GET /api/orders  (admin: all; user: their own)
export const getOrders = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 20 } = req.query;
  const filter = {};

  if (req.user.role !== 'admin') filter.user = req.user._id;
  if (status) filter.status = status;

  const skip  = (Number(page) - 1) * Number(limit);
  const total = await Order.countDocuments(filter);

  const orders = await Order.find(filter)
    .populate('user', 'name email')
    .sort('-createdAt')
    .skip(skip)
    .limit(Number(limit));

  sendSuccess(res, {
    orders,
    pagination: { total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / Number(limit)) },
  });
});

// GET /api/orders/:id
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (!order) return sendError(res, 'Order not found', 404);

  // Non-admins can only see their own orders
  if (req.user.role !== 'admin' && String(order.user?._id) !== String(req.user._id)) {
    return sendError(res, 'Not authorized to view this order', 403);
  }

  sendSuccess(res, { order });
});

// GET /api/orders/number/:orderNumber
export const getOrderByNumber = asyncHandler(async (req, res) => {
  const order = await Order.findOne({ orderNumber: req.params.orderNumber })
    .populate('user', 'name email');
  if (!order) return sendError(res, 'Order not found', 404);
  sendSuccess(res, { order });
});

// PUT /api/orders/:id/status  (admin)
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const update = { status };

  if (status === 'delivered') update.deliveredAt = new Date();
  if (status === 'cancelled') update.cancelledAt = new Date();

  const order = await Order.findByIdAndUpdate(req.params.id, update, { new: true });
  if (!order) return sendError(res, 'Order not found', 404);
  sendSuccess(res, { order }, `Order marked as ${status}`);
});

// PUT /api/orders/:id/payment  (webhook / admin)
export const updatePaymentStatus = asyncHandler(async (req, res) => {
  const { paymentStatus, paymentReference } = req.body;
  const update = { paymentStatus, paymentReference };

  if (paymentStatus === 'paid') {
    update.paidAt = new Date();
    update.status = 'confirmed';
  }

  const order = await Order.findByIdAndUpdate(req.params.id, update, { new: true });
  if (!order) return sendError(res, 'Order not found', 404);
  sendSuccess(res, { order }, 'Payment status updated');
});

// DELETE /api/orders/:id  (admin)
export const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (!order) return sendError(res, 'Order not found', 404);
  sendSuccess(res, {}, 'Order deleted');
});
