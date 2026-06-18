require("dotenv").config();
const mongoose = require("mongoose");
const songModel = require("./src/models/song.model");

const seedSongs = [
  {
    title: "Lady Singham",
    url: "https://ik.imagekit.io/hnoglyswo0/cohort-2/moodify/songs/Lady_Singham_gs01DFz-1.mp3",
    posterUrl: "https://ik.imagekit.io/hnoglyswo0/cohort-2/moodify/posters/Lady_Singham_VW8DGJkie.jpeg",
    mood: "happy",
  },
  {
    title: "Sunny Days",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    posterUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500",
    mood: "happy",
  },
  {
    title: "Rainy Mood",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    posterUrl: "https://images.unsplash.com/photo-1437419764061-2473afe69fc2?w=500",
    mood: "sad",
  },
  {
    title: "Chill Beats",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    posterUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500",
    mood: "neutral",
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB...");
    
    // Clear existing songs
    await songModel.deleteMany({});
    console.log("Cleared old songs.");

    // Insert new seed songs
    await songModel.insertMany(seedSongs);
    console.log("Successfully seeded songs into the database!");
    
    process.exit(0);
  } catch (error) {
    console.error("Error seeding songs:", error);
    process.exit(1);
  }
}

seed();
