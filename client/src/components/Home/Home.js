import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner } from 'reactstrap';
import './home.css';
import { HOST } from '../../config';

const Home = (props) => {
	const [clipList, setClipList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [errorText, setErrorText] = useState('');

	useEffect(() => {
		const CancelToken = axios.CancelToken;
		const source = CancelToken.source();
		axios
			.get(`${HOST}/api/clips`, {
				cancelToken: source.token,
				// withCredentials: true,
			})
			.then((res) => {
				setClipList(res.data);
				setIsLoading(false);
			})
			.catch((err) => {
				if (axios.isCancel(err)) {
					console.log('cancelled');
				} else {
					setErrorText(err.response.data.message);
				}
			});

		return () => {
			source.cancel();
		};
	}, []);

	const handleDeleteClip = (id) => () => {
		axios
			.delete(`${HOST}/api/clips/${id}`) // { withCredentials: true }
			.then((res) => {
				if (res.status === 200) {
					setClipList(clipList.filter((clip) => clip._id !== id));
				}
			})
			.catch((err) => {
				this.setState({
					errorText: err.response.data.message,
				});
			});
	};

	const clips = clipList.map((clip) => {
		return (
			<div className="clip col-xs-12 col-sm-12 col-md-3 col-lg-4" key={clip._id}>
				<div className="clip-preview">
					<video
						src={clip.filePath}
						width="355"
						height="200"
						controls
						poster={clip.previewPath}
					/>
				</div>
				<div className="d-flex flex-row justify-content-between">
					<div>
						<div className="clip-title">{clip.title.replace(/_/g, ' ')}</div>
						<div>
							{new Date(clip.createDate).toLocaleString('ru-RU', { hour12: false })}
						</div>
					</div>
					<button
						type="button"
						onClick={handleDeleteClip(clip._id)}
						className="btn btn-secondary btn-sm">
						Delete clip
					</button>
				</div>
			</div>
		);
	});

	return (
		<>
			<div className="container mt-5">
				<h4>Loaded clips</h4>
				<hr className="my-4" />
				<div className="row">
					{errorText ? (
						errorText
					) : isLoading ? (
						<Spinner color="info" style={{ width: '3rem', height: '3rem' }} />
					) : clips.length > 0 ? (
						clips
					) : (
						'Nothing to view. Please, upload something :)'
					)}
				</div>
			</div>
		</>
	);
};

export default Home;
