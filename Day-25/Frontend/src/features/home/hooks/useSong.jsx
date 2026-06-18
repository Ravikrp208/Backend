import { getSong } from "../service/song.api";
import { useContext } from "react";
import { SongContext } from "../song.context";

export const useSong = () => {
  const context = useContext(SongContext);

  const {
    loading,
    setLoading,
    song,
    setSong,
    songs,
    setSongs,
    allSongs,
    setAllSongs,
    detectedMood,
    setDetectedMood,
  } = context;

  async function handleGetSong({ mood }) {
    setLoading(true);
    setDetectedMood(mood);
    try {
      const data = await getSong({ mood });
      const fetchedSongs = data.songs || [];
      setSongs(fetchedSongs);
      if (fetchedSongs.length > 0) {
        setSong(fetchedSongs[0]);
      } else {
        setSong(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleGetAllSongs() {
    setLoading(true);
    try {
      const data = await getSong({ mood: "all" });
      const fetchedSongs = data.songs || [];
      setAllSongs(fetchedSongs);
      if (fetchedSongs.length > 0 && !song) {
        setSong(fetchedSongs[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    song,
    songs,
    setSong,
    allSongs,
    setAllSongs,
    detectedMood,
    setDetectedMood,
    handleGetSong,
    handleGetAllSongs,
  };
};
