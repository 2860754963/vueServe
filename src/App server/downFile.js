/*
 * @Author: Nigulasi
 * @Date: 2024-06-17 15:20:46
 * @Last Modified by: Nigulasi
 * @Describe:  abortController virtualList
 */
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());

const host = 'http://localhost';
const port = 9528;

//  abortController  use to stop axios
app.get('/video', (req, res) => {
  const videoPath = path.resolve(__dirname, 'files', 'video.mp4');
  const videoSize = fs.statSync(videoPath).size;
  const range = req.headers.range;
  if (range) {
    let [start, end] = range.replace(/bytes=/, '').split('-');
    start = parseInt(start, 10);
    end = end ? parseInt(end, 10) : videoSize - 1;
    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${videoSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': end - start + 1,
      'Content-Type': 'video/mp4',
    });
    fs.createReadStream(videoPath, { start, end }).pipe(res);
  } else {
    res.writeHead(200, {
      'Content-Length': videoSize,
      'Content-Type': 'video/mp4',
    });
    fs.createReadStream(videoPath).pipe(res);
  }
});

// lageData use to virtual list
app.get('/virtualList', (req, res) => {
  const data = [];
  for (let index = 0; index < 100000; index++) {
    data.push({ id: index, name: `名字${index}`, value: index });
  }
  res.send({ code: 0, result: 'success', data });
});

app.listen(port, () => {
  console.log(`server is running at ${host}:${port}`);
});
