// Model: Product
// Schema to be defined in Phase 19
import mongoose from 'mongoose';
const ProductSchema = new mongoose.Schema({}, { timestamps: true });
export default mongoose.model('Product', ProductSchema);
