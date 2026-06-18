require("dotenv").config();
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const nodeId3 = require("node-id3");
const songModel = require("./src/models/song.model");

const songDir = path.join(__dirname, "../song");
const publicPostersDir = path.join(__dirname, "public/posters");

// List of moods to assign to songs in a balanced way
const MOODS = ["happy", "sad", "neutral", "surprised"];

// Clean titles from websites naming tags
function cleanTitle(title, fallback) {
  if (!title) return fallback || "Unknown Song";
  return title
    .replace(/\[DownloadMing\.[A-Z]+\]/gi, "")
    .replace(/\[Songs\.PK\]/gi, "")
    .replace(/DownloadMing/gi, "")
    .replace(/SongsPK/gi, "")
    .replace(/_128/g, "")
    .replace(/_320/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

async function seed() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected successfully!");

    // Ensure public/posters exists
    if (!fs.existsSync(publicPostersDir)) {
      fs.mkdirSync(publicPostersDir, { recursive: true });
      console.log("Created directory:", publicPostersDir);
    }

    if (!fs.existsSync(songDir)) {
      console.error("Song directory not found at:", songDir);
      process.exit(1);
    }

    const files = fs.readdirSync(songDir).filter((file) => file.endsWith(".mp3"));
    console.log(`Found ${files.length} MP3 files in ${songDir}`);

    // Clear existing database
    await songModel.deleteMany({});
    console.log("Cleared old songs from database.");

    const seedSongs = [];

    for (let i = 0; i < files.length; i++) {
      const filename = files[i];
      const filePath = path.join(songDir, filename);
      const filenameWithoutExt = path.basename(filename, ".mp3");

      let tags = {};
      try {
        tags = nodeId3.read(filePath) || {};
      } catch (err) {
        console.warn(`Could not read tags for ${filename}:`, err.message);
      }

      const songTitle = cleanTitle(tags.title, filenameWithoutExt);
      const mood = MOODS[i % MOODS.length];

      let posterUrl = "";
      let hasImage = false;

      // Extract cover image if available
      if (tags.image && tags.image.imageBuffer) {
        try {
          const imagePath = path.join(publicPostersDir, `${filenameWithoutExt}.jpg`);
          fs.writeFileSync(imagePath, tags.image.imageBuffer);
          posterUrl = `http://localhost:3000/posters/${filenameWithoutExt}.jpg`;
          hasImage = true;
        } catch (imgErr) {
          console.error(`Error saving image for ${filename}:`, imgErr.message);
        }
      }

      // Fallback poster
      if (!hasImage) {
        // High quality general music/concert placeholder posters depending on mood
        const fallbacks = {
          happy: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=500&q=80",
          sad: "https://images.unsplash.com/photo-1484755560695-a4c74891d06e?w=500&q=80",
          neutral: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&q=80",
          surprised: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80"
        };
        posterUrl = fallbacks[mood];
      }

      const songData = {
        title: songTitle,
        url: `http://localhost:3000/songs/${encodeURIComponent(filename)}`,
        posterUrl: posterUrl,
        mood: mood,
      };

      seedSongs.push(songData);
    }

    console.log(`Inserting ${seedSongs.length} songs into database...`);
    await songModel.insertMany(seedSongs);
    console.log("Database seeded successfully!");

    process.exit(0);
  } catch (error) {
    console.error("Error in seeding process:", error);
    process.exit(1);
  }
}

seed();
