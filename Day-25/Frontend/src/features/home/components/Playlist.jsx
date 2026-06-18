import React from "react";
import { useSong } from "../hooks/useSong";
import "./playlist.scss";

const Playlist = () => {
  const { songs, song, setSong } = useSong();

  if (!songs || songs.length === 0) {
    return (
      <div className="playlist-empty">
        <p>No songs loaded yet. Detect your expression to fetch matching music!</p>
      </div>
    );
  }

  const currentMood = songs[0]?.mood || "";

  return (
    <div className="playlist-container">
      <h3 className="playlist-title">
        Detected Mood: <span className={`mood-badge mood-badge--${currentMood}`}>{currentMood}</span>
      </h3>
      <div className="playlist-list">
        {songs.map((item) => {
          const isActive = song?._id === item._id;
          return (
            <div
              key={item._id}
              className={`playlist-item ${isActive ? "playlist-item--active" : ""}`}
              onClick={() => setSong(item)}
            >
              <div className="playlist-item__cover-wrap">
                <img
                  className="playlist-item__cover"
                  src={item.posterUrl}
                  alt={item.title}
                />
                {isActive && (
                  <div className="playlist-item__playing-overlay">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                  </div>
                )}
              </div>
              <div className="playlist-item__details">
                <h4 className="playlist-item__title">{item.title}</h4>
                <p className="playlist-item__mood">{item.mood}</p>
              </div>
              <button className="playlist-item__play-btn">
                {isActive ? "Playing" : "Play"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Playlist;
