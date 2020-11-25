import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
const util = require('util');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'media/uploads/');
	},
	filename: (req, file, cb) => {
		const match = [
			'video/mpeg',
			'video/mp4',
			'video/quicktime',
			'video/webm',
			'video/x-msvideo',
			'video/x-ms-wmv',
		];

		if (match.indexOf(file.mimetype) === -1) {
			var message = `${file.originalname} is invalid. Only accept video formats.`;
			return cb(message, null);
		}

		const ext = file.originalname.split('.').pop();
		const filename = `${uuidv4()}.${ext}`;
		cb(null, filename);
	},
});

const uploadFiles = multer({
	storage: storage,
	limits: { fileSize: 50 * 1024 * 1024 },
}).any();

export const uploadFilesMiddleware = util.promisify(uploadFiles);
