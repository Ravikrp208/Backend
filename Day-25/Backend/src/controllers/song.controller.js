const songModel = require("../models/song.model")
const storageService = require("../services/storage.service")
const id3 = require("node-id3")


async function uploadSong(req, res) {

    const songBuffer = req.file.buffer
    const { mood } = req.body

    const tags = id3.read(songBuffer)

    const [ songFile, posterFile ] = await Promise.all([
        storageService.uploadFile({
            buffer: songBuffer,
            filename: tags.title + ".mp3",
            folder: "/cohort-2/moodify/songs"
        }),
        storageService.uploadFile({
            buffer: tags.image.imageBuffer,
            filename: tags.title + ".jpeg",
            folder: "/cohort-2/moodify/posters"
        })
    ])

    const song = await songModel.create({
        title: tags.title,
        url: songFile.url,
        posterUrl: posterFile.url,
        mood
    })

    res.status(201).json({
        message: "song created successfully",
        song
    })

}

async function getSong(req, res) {
  try {
    const { mood } = req.query;
    let query = {};
    if (mood && mood.toLowerCase() !== "all") {
      query.mood = mood.toLowerCase();
    }

    const songs = await songModel.find(query);

    res.status(200).json({
      message: "songs fetched successfully.",
      songs,
      song: songs.length > 0 ? songs[0] : null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch songs",
      error: error.message,
    });
  }
}

module.exports = { uploadSong, getSong }