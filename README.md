# iCSee merge
A script used to automatically merge multiple continuous videos downloaded from the iCSee monitoring security software.

The quickest way to save long recorded intervals from your camera is by downloading them through the function the application offers. However, these videos are usually split every 5 minutes the camera runs. This script automatically detects which videos should be merged and converts them into a single file. For example, if video A ends at 2021-12-25 23:05:00 and video B starts at 2021-12-25 23:05:00, they are going to get merged.

## Usage
First of all, [download FFmpeg](https://www.ffmpeg.org/download.html) and place ffmpeg.exe inside /ffmpeg/.

To merge multiple videos:
1. Place the videos downloaded through the application inside /toMerge/, without changing their default name.
2. Run the script and wait.
