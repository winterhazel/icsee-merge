<div id="top"></div>
<!-- PROJECT LOGO -->
<h3 align="center">iCSee merge</h3>
  <p align="center">
    A script used to automatically merge multiple continuous videos downloaded from the iCSee monitoring security software
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
  <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

The quickest way to save long recorded intervals from your camera is by downloading them through the function the application offers. However, these videos are usually split every 5 minutes the camera runs. 

This script automatically detects which videos should be merged and converts them into a single file. For example, if video A ends at 2021-12-25 23:05:00 and video B starts at 2021-12-25 23:05:00, they are going to get merged.



<!-- GETTING STARTED -->
## Getting Started

### Installation

1. Clone the repo
2. Download the latest build of FFmpeg at [https://www.ffmpeg.org/download.html](https://www.ffmpeg.org/download.html)
3. Place /bin/ffmpeg.exe inside /ffmpeg/



<!-- USAGE EXAMPLES -->
## Usage

1. Place the videos downloaded through the application inside /toMerge/, without changing their default name
2. Run the script with 
```sh
node index.js
```



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [FFmpeg](https://ffmpeg.org/)