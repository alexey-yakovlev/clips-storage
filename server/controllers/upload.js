import dotenv from 'dotenv';
dotenv.config({
	path: `${__dirname}/.env`,
});
import { Clip } from '../models';
import generatePreview from '../utils/generatePreview';
import { uploadFilesMiddleware } from '../middleware/uploadFiles';

export const multipleUpload = async (req, res) => {
	try {
		await uploadFilesMiddleware(req, res);
		// console.log(req.files);

		if (req.files.length > 5) {
			return res.status(413).send({ message: 'Too many files to upload.' });
		}

		req.files.forEach(async (file) => {
			const { filename } = file;
			const guid = file.filename.split('.')[0];
			const virtFilePath = `${req.headers.origin}/clip/${filename}`;
			try {
				generatePreview(file.path, guid);
			} catch (error) {
				console.log(error);
			}

			const clip = new Clip({
				userId: req.user.id,
				title: file.originalname,
				filePath: virtFilePath,
				previewPath: `${req.headers.origin}/clip/image_previews/${guid}.jpg`,
			});

			try {
				await clip.save();
			} catch (err) {
				console.log(err);
			}
		});

		return res.status(200).send({ message: 'Clip(s) was upload successfully' });
	} catch (error) {
		console.log(error);
		return res.status(502).send({
			message: `Error when trying upload files: ${error}`,
		});
	}
};
