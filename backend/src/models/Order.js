// Model: Order
// Schema to be defined in Phase 19
import mongoose from 'mongoose';
const OrderSchema = new mongoose.Schema({}, { timestamps: true });
export default mongoose.model('Order', OrderSchema);
