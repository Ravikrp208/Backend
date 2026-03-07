const express = require('express');
const upload = require('../middleware/upload.middleware');      
const { uploadSong } = require('../controllers/song.controller');


const router = express.Router();

/**
 * post a song /api/songs
 */
router.post( "/",upload.single('song'), )

module.exports = router;