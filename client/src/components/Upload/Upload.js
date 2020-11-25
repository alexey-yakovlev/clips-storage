import React, { useState } from 'react';
import axios from 'axios';
import { Progress } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './upload.css';
import { HOST } from '../../config';

const Upload = (props) => {
	const [selectedClips, setSelectedClips] = useState(null);
	const [maxUploads] = useState(5);
	const [loaded, setLoaded] = useState(0);

	const validateFileSize = (e) => {
		const files = e.target.files;
		let err = '';
		[...files].forEach((file) => {
			if (file.size > 50 * 1024 * 1024) {
				err += file.name + ', ';
			}
		});
		if (err !== '') {
			e.target.value = null;
			toast.error(err + ' is too large, select file size < 50Mb');
			return false;
		}
		return true;
	};

	const fileChangeHandler = (e) => {
		const files = e.target.files;
		if (validateFileSize(e)) {
			setSelectedClips(files);
			setLoaded(0);
		}
	};

	const fileUploadHandler = (e) => {
		e.preventDefault();
		if (!selectedClips) {
			toast.error('You must select at least 1 file.');
			return;
		}
		if (selectedClips.length > maxUploads) {
			toast.error(`Added more than 5 files`);
			return;
		}
		const data = new FormData();
		for (let i = 0; i < selectedClips.length; i++) {
			data.append('file', selectedClips[i]);
		}
		axios
			.post(`${HOST}/api/upload`, data, {
				onUploadProgress: (progressEvent) => {
					setLoaded((progressEvent.loaded / progressEvent.total) * 100);
				},
				// withCredentials: true,
			})
			.then((res) => {
				if (res.status === 200) {
					toast.success(res.data.message);
				} else {
					toast.error(`Upload Fail with status: ${res.data.message}`);
				}
				e.target.reset();
			})
			.catch((err) => {
				toast.error(`Upload Fail with status: ${err}`);
			});
	};

	return (
		<>
			<div className="container mt-5">
				<div className="form-group">
					<ToastContainer />
				</div>
				<h4>Upload Clips</h4>
				<hr className="my-4" />

				<form
					onSubmit={fileUploadHandler}
					method="post"
					name="videoUpload"
					//action="/api/upload"
					id="#"
					encType="multipart/form-data"
					data-max-uploads="5">
					<div className="form-group files">
						<label>Upload clips here (5 files at once)</label>
						<input
							type="file"
							name="multi-files"
							className="form-control"
							multiple="multiple"
							accept="video/mp4,video/x-m4v,video/*"
							onChange={fileChangeHandler}
						/>
						<Progress max="100" color="success" value={loaded} className="mt-4 mb-1">
							{isNaN(Math.round(loaded, 2)) ? 0 : Math.round(loaded, 2)}%
						</Progress>
						<button
							type="submit"
							className="btn btn-success btn-block"
							value="Upload Video">
							Upload Clips
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default Upload;
