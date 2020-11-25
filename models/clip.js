import mongoose from 'mongoose';

const clipSchema = mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	title: { type: String, required: true },
	filePath: { type: String, required: true },
	previewPath: { type: String, required: true },
	createDate: { type: Date, default: Date.now }, // FIX IT
});

export default mongoose.model('Clip', clipSchema);
