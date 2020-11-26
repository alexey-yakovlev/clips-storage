import { spawn } from 'child_process';
import { createWriteStream } from 'fs';

const ffmpegPath = '/usr/local/bin/ffmpeg';
const width = 355;
const height = 200;

const generatePreview = (filePathOnServer, guid) => {
	const tmpFile = createWriteStream(
		`${process.cwd()}/server/media/uploads/image_previews/${guid}.jpg`
	);
	const ffmpeg = spawn(ffmpegPath, [
		'-ss',
		0,
		'-i',
		filePathOnServer,
		'-vf',
		`thumbnail,scale=${width}:${height}`,
		'-qscale:v',
		'2',
		'-frames:v',
		'1',
		'-f',
		'image2',
		'-c:v',
		'mjpeg',
		'pipe:1',
	]);
	if (typeof ffmpeg.pid !== 'number') {
		throw new Error('Failed to spawn ffmpeg.');
	}
	ffmpeg.stdout.pipe(tmpFile);
};

export default generatePreview;
