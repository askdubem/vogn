import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    name:          { type: String,  required: true },
    image:         { type: String,  default: '' },
    price:         { type: Number,  required: true },
    discountPrice: { type: Number,  default: null },
    quantity:      { type: Number,  required: true, min: 1 },
    selectedColor: { type: String,  default: null },
    selectedSize:  { type: String,  default: null },
  },
  { _id: false }
);

const shippingAddressSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email:    { type: String, required: true },
    phone:    { type: String, required: true },
    address:  { type: String, required: true },
    state:    { type: String, required: true },
    country:  { type: String, default: 'Nigeria' },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null, // allow guest orders
    },
    orderNumber: {
      type: String,
      unique: true,
    },
    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: arr => arr.length > 0,
        message: 'Order must have at least one item',
      },
    },
    shippingAddress: {
      type: shippingAddressSchema,
      required: true,
    },
    subtotal:     { type: Number, required: true },
    shippingFee:  { type: Number, required: true, default: 0 },
    totalAmount:  { type: Number, required: true },

    status: {
      type: String,
      enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
      default: 'pending',
    },

    paymentStatus: {
      type: String,
      enum: ['unpaid', 'paid', 'refunded', 'failed'],
      default: 'unpaid',
    },
    paymentMethod: {
      type: String,
      enum: ['paystack', 'flutterwave', 'whatsapp', 'bank_transfer'],
      default: 'paystack',
    },
    paymentReference: { type: String, default: null },
    paidAt:           { type: Date,   default: null },

    notes:       { type: String, default: '' },
    deliveredAt: { type: Date,   default: null },
    cancelledAt: { type: Date,   default: null },
  },
  { timestamps: true }
);

// Auto-generate order number before save
orderSchema.pre('save', async function (next) {
  if (!this.orderNumber) {
    const count = await mongoose.model('Order').countDocuments();
    this.orderNumber = `VGN-${String(count + 1).padStart(5, '0')}`;
  }
  next();
});

// Indexes
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ user: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ paymentStatus: 1 });
orderSchema.index({ createdAt: -1 });

export default mongoose.model('Order', orderSchema);
