// Model: Category
// Schema to be defined in Phase 19
import mongoose from 'mongoose';
const CategorySchema = new mongoose.Schema({}, { timestamps: true });
export default mongoose.model('Category', CategorySchema);
