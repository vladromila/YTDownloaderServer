const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const ytdl = require('ytdl-core');
const app = express();
var cors = require('cors')


app.use(bodyParser.json());
app.use(cors());
app.get('/', (req, res, next) => {
    res.send('<form action="/add-product" method="POST"><input name="product" /><button type="submit">Add Code</button></form>')
})
app.post('/get-title', (req, res, next) => {
    ytdl.getInfo(req.body.url, (err, info) => {
        if (err) {
            res.send(err)
        }
        else
            res.send({
                title: info.title,
                thumbnail: info.thumbnail_url
            })
    })
})
app.post('/createmp3', (req, res, next) => {
    req.body.videos.forEach(video => {
        console.log(`Se incarca ${video.title}`);
        ytdl(video.url, { format: 'audioonly' })
            .pipe(fs.createWriteStream(`music/${video.title}.wav`).on('close', () => {
                console.log(`gata ${video.title}`);
            }))
    });
})
app.listen(1234, () => {
    console.log('The server has successfully started!!');
})