const path = require('path');
const fs = require('fs');
const { spawnSync } = require('child_process');

const pathFFmpeg = './ffmpeg/ffmpeg.exe';

const pathToMerge = './toMerge';
const pathMerged = './merged';

function ffmpegAvailable() {
    return fs.existsSync(pathFFmpeg);
}

function getDirectories(source) {
    if (!fs.existsSync(source)) {
        fs.mkdirSync(source);
    }

    return fs.readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => path.join(source, dirent.name));
}

function getVideos(source) {
    return fs.readdirSync(source, { withFileTypes: true })
        .filter(dirent => path.extname(dirent.name).toLowerCase() === '.mp4')
        .map(dirent => path.join(source, dirent.name));
}

function getVideoStartDate(videoPath) {
    let fileName = videoPath.substring(videoPath.lastIndexOf('\\') + 1, videoPath.length);
    return fileName.split('_')[0];
}

function getVideoEndDate(videoPath) {
    let fileName = videoPath.substring(videoPath.lastIndexOf('\\') + 1, videoPath.length);
    return fileName.split('_')[1];
}

function groupVideos(videos) {
    let groupedVideoCount = 1;
    for (let i = 0; i < videos.length; i++) {
        if (!fs.existsSync(path.join(pathToMerge, groupedVideoCount.toString()))) {
            fs.mkdirSync(path.join(pathToMerge, groupedVideoCount.toString()));
        }

        fs.renameSync(videos[i], `${pathToMerge}\\${groupedVideoCount}\\${videos[i].substring(videos[i].lastIndexOf('\\') + 1, videos[i].length)}`);

        if (i + 1 < videos.length && getVideoEndDate(videos[i]) !== getVideoStartDate(videos[i + 1])) {
            groupedVideoCount++;
        }
    }
}

function merge(directory) {
    if (!fs.existsSync(pathMerged)) {
        fs.mkdirSync(pathMerged);
    }

    let dirName = directory.substring(directory.lastIndexOf('\\') + 1, directory.length);
    let videos = getVideos(directory);

    let videoList = '';
    videos.forEach(video => videoList += `file '${video.replace('\\', '/').split('\\').pop()}'\n`);

    fs.writeFileSync(`${directory}\\list.txt`, videoList);
    if (fs.existsSync(`${pathMerged}\\${dirName}.mp4`)) {
        fs.unlinkSync(`${pathMerged}\\${dirName}.mp4`);
    }
    spawnSync(pathFFmpeg, ['-f', 'concat', '-safe', '0', '-i', `${directory}\\list.txt`, '-c', 'copy', `${pathMerged}\\${dirName}.mp4`]);
    fs.unlinkSync(`${directory}\\list.txt`);
}

function init() {
    if (!ffmpegAvailable(pathFFmpeg)) {
        console.log(`FFmpeg not found at ${pathFFmpeg}`);
        return;
    }

    const videos = getVideos(pathToMerge);
    groupVideos(videos);

    const directories = getDirectories(pathToMerge);
    console.log(`Found ${directories.length} videos`);
    directories.forEach(directory => {
        console.log(`(${directories.indexOf(directory) + 1}) Merging: ${directory}`);
        merge(directory);
    });
    console.log(`Done! Merged videos saved at ${pathMerged}`);
}

init();