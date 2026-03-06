const { model } = require("mongoose");
const songModel = require("../models/song.model");


async function uploadSong (req, res) {
   const tags = id3.read(req.file.buffer)

   console.log(tags);

}


model.exports = {
    uploadSong
}