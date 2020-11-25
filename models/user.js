import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: {
		type: String,
		required: true,
		lowercase: true,
		unique: true,
		match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
		createDate: { type: Date, default: Date.now }, // FIX IT
	},
	password: { type: String, required: true },
});

export default mongoose.model('User', userSchema);
