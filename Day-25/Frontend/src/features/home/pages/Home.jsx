import React, { useState, useEffect } from "react";
import FaceExpression from "../../Expression/components/FaceExpression";
import Player from "../components/Player";
import Playlist from "../components/Playlist";
import { useSong } from "../hooks/useSong";
import { useAuth } from "../../auth/hooks/useAuth";
import "./Home.scss";

const Home = () => {
  const {
    allSongs,
    song,
    setSong,
    handleGetAllSongs,
    handleGetSong,
    detectedMood,
  } = useSong();

  const { user, handleLogout } = useAuth();

  const [activeTab, setActiveTab] = useState("library"); // "library" or "scanner"
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMood, setSelectedMood] = useState("all");

  // Fetch all songs in the library when page loads
  useEffect(() => {
    handleGetAllSongs();
  }, []);

  // Filter the 100 songs based on search query and category pills
  const filteredSongs = allSongs.filter((item) => {
    // 1. Filter by category
    if (selectedMood !== "all" && item.mood !== selectedMood) {
      return false;
    }
    // 2. Filter by search text (title or mood)
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const matchesTitle = item.title?.toLowerCase().includes(q);
      const matchesMood = item.mood?.toLowerCase().includes(q);
      return matchesTitle || matchesMood;
    }
    return true;
  });

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    setActiveTab("library");
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="dashboard__sidebar">
        <div className="sidebar-brand">
          <span>Moodify AI</span>
        </div>

        <div className="sidebar-menu">
          <span className="menu-title">Discover</span>
          <button
            className={`menu-item ${activeTab === "library" ? "menu-item--active" : ""}`}
            onClick={() => setActiveTab("library")}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
            Music Library
          </button>
          
          <button
            className={`menu-item ${activeTab === "scanner" ? "menu-item--active" : ""}`}
            onClick={() => setActiveTab("scanner")}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
            AI Mood Scanner
          </button>
        </div>

        <div className="sidebar-menu">
          <span className="menu-title">Quick Moods</span>
          <div className="sidebar-moods">
            {["happy", "sad", "neutral", "surprised"].map((mood) => (
              <button
                key={mood}
                className={`mood-btn mood-${mood} ${selectedMood === mood && activeTab === "library" ? "active-mood" : ""}`}
                onClick={() => handleMoodSelect(mood)}
              >
                <span style={{ textTransform: "capitalize" }}>{mood}</span>
                <span>
                  {mood === "happy" && "☀️"}
                  {mood === "sad" && "🌧️"}
                  {mood === "neutral" && "😐"}
                  {mood === "surprised" && "😲"}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Logout button at bottom */}
        <div style={{ marginTop: "auto" }}>
          <button
            className="menu-item"
            style={{ width: "100%", color: "#ff4a4a" }}
            onClick={handleLogout}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard__main">
        {/* Header */}
        <header className="main-header">
          <div className="search-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search by song name or mood..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="user-badge">
            <div className="avatar">
              {user?.username ? user.username.charAt(0).toUpperCase() : "U"}
            </div>
            <span className="username">{user?.username || "Guest User"}</span>
          </div>
        </header>

        {/* Content Panel based on activeTab */}
        {activeTab === "library" ? (
          <div className="view-library">
            <div className="library-title-row">
              <h2>Browse Music</h2>
              <span className="song-count">{filteredSongs.length} songs</span>
            </div>

            <div className="category-pills">
              {["all", "happy", "sad", "neutral", "surprised"].map((mood) => (
                <button
                  key={mood}
                  className={`pill ${selectedMood === mood ? "pill--active" : ""}`}
                  onClick={() => setSelectedMood(mood)}
                >
                  {mood}
                </button>
              ))}
            </div>

            <div className="songs-grid">
              {filteredSongs.map((item) => {
                const isActive = song?._id === item._id;
                return (
                  <div
                    key={item._id}
                    className={`song-card ${isActive ? "song-card--active" : ""}`}
                    onClick={() => setSong(item)}
                  >
                    <div className="card-cover-wrap">
                      <img src={item.posterUrl} alt={item.title} />
                      <div className="play-overlay">
                        <div className="play-btn-circle">
                          {isActive ? (
                            <svg viewBox="0 0 24 24">
                              <rect x="6" y="4" width="4" height="16" />
                              <rect x="14" y="4" width="4" height="16" />
                            </svg>
                          ) : (
                            <svg viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </div>
                    <h3 className="song-card__title" title={item.title}>
                      {item.title}
                    </h3>
                    <div className="card-footer">
                      <span className={`song-mood-tag song-mood-tag--${item.mood}`}>
                        {item.mood}
                      </span>
                    </div>
                  </div>
                );
              })}
              {filteredSongs.length === 0 && (
                <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "4rem", opacity: 0.4 }}>
                  No songs matching your current search filters.
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="view-scanner">
            <div>
              <div className="library-title-row" style={{ marginBottom: "1.5rem" }}>
                <h2 style={{ fontSize: "1.6rem" }}>AI Mood Analysis</h2>
              </div>
              <FaceExpression
                onClick={(expression) => {
                  handleGetSong({ mood: expression });
                }}
              />
            </div>
            
            <div className="recommendations-wrap">
              <div className="sec-title">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#ff5e3a" strokeWidth="2.5">
                  <path d="M9 18V5l12-2v13" />
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="18" cy="16" r="3" />
                </svg>
                <span>Recommended Playlist</span>
              </div>
              <Playlist />
            </div>
          </div>
        )}
      </main>

      {/* Floating Bottom Player */}
      <Player />
    </div>
  );
};

export default Home;
