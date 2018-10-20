import mongoose, { Schema } from 'mongoose';
const { ObjectId } = Schema.Types;

const AnswerSchema = new Schema({
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
  user: { type: ObjectId, ref: 'user', required: true }
});

export default mongoose.model('Answer', AnswerSchema);
