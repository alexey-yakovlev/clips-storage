import { Clip } from '../models';

export const getAllClips = (req, res) => {
	Clip.find({ userId: req.user.id })
		.sort({ _id: -1 })
		.exec()
		.then((clips) => {
			return res.status(200).json(clips);
		})
		.catch((error) => {
			return res.status(500).json({ error });
		});
};

export const deleteClipById = (req, res) => {
	const id = req.params.id;
	Clip.findByIdAndDelete(id)
		.exec()
		.then((clip) => {
			return res.status(200).json({ message: `${clip.title} deleted` });
		})
		.catch((error) => {
			return res.status(500).json({ error });
		});
};
