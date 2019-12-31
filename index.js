const ytdl = require('ytdl-core');
var cors = require('cors')
const path = require('path');
const express = require('express');
const app = express();

app.use(cors())

const VIDEO_BASE = 'http://www.youtube.com/watch?v=';

app.use('mp3', express.static(__dirname + '/mp3'));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/stream/:id', (req, res) => {
  console.log('video url >> ', VIDEO_BASE + req.params.id);

  try {
    const astream = ytdl(VIDEO_BASE + req.params.id, {
      quality: 251
    });
  
    astream
      .on('data', chunk => {
        // console.log('Data chunck received >> ', chunk);
        // fs.appendFile('./mp3/new_media.m4a', chunk, err => {
        //   if(err) throw err;
        // });
      })
      .pipe(res);

    astream.on('error', err => {
      console.error('There was an error, ', err);
      res.status(400).end();  
    });
  } catch(err) {
    console.error('There was an error, ', err);
    res.status(400).end();
  }
})

// 1. Piping hot youtube audio stream through Express and to client player
// - Generally works
// - Can not move track position / range
// - No of users / concurrency likely low because each stream needs to download and pipe entire file through Express server

// 2. Have static audio file downloaded and stored in static bucket Eg. Firebase
// - High user count, much more scalable as we don't need to worry about the technicals
// - Need to download file before the user streams or build dynamic download and switching backend logic
// - Still have flexibility to stream this from Express server if we want

const port = process.env.PORT || 80;
app.listen(port, () => console.log('Example app listening on port 3000!'));
