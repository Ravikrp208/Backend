import React, { useEffect, useState } from "react";
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
    setDetectedMood,
  } = useSong();

  const { user, handleLogout } = useAuth();

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

  const handleFaceDetect = (expression) => {
    handleGetSong({ mood: expression });
  };

  const resetScan = () => {
    setDetectedMood(null);
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="dashboard__sidebar">
        <div className="sidebar-brand">
          <span>Moodify AI</span>
        </div>

        <div className="sidebar-menu">
          <span className="menu-title">Navigation</span>
          <button
            className="menu-item menu-item--active"
            onClick={resetScan}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
            Home Dashboard
          </button>
        </div>

        {detectedMood && (
          <div className="sidebar-menu">
            <span className="menu-title">Quick Moods</span>
            <div className="sidebar-moods">
              {["happy", "sad", "neutral", "surprised"].map((mood) => (
                <button
                  key={mood}
                  className={`mood-btn mood-${mood} ${selectedMood === mood ? "active-mood" : ""}`}
                  onClick={() => setSelectedMood(mood)}
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
        )}

        {/* Logout button */}
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
              disabled={!detectedMood}
            />
          </div>

          <div className="user-badge">
            <div className="avatar">
              {user?.username ? user.username.charAt(0).toUpperCase() : "U"}
            </div>
            <span className="username">{user?.username || "Guest User"}</span>
          </div>
        </header>

        {/* 1. Welcome Banner (Home page styling) */}
        <section className="welcome-banner">
          <div className="welcome-banner__content">
            <h1>Moodify AI — Personalized Music 🎵</h1>
            <p>
              Experience music tailored to your emotions. Position your face in front of the camera below, scan your expression, and watch the AI instantly unlock a custom playlist and our entire 100-song library!
            </p>
          </div>
        </section>

        {/* 2. Face Detection Section (Directly visible on Homepage) */}
        <section className="scanner-section-wrap">
          <div className="view-scanner-center">
            <div className="sec-header">
              <h2>Face AI Mood Detection</h2>
              <p>Detect your face expression to unlock the song library</p>
            </div>
            <FaceExpression onClick={handleFaceDetect} />
          </div>
        </section>

        {/* 3. Song List Section (Revealed AFTER face detection is successful) */}
        {detectedMood ? (
          <div className="reveal-container" style={{ animation: "fadeIn 0.6s ease-out" }}>
            {/* AI Recommendations */}
            <section className="recommended-section">
              <div className="library-title-row">
                <h2>AI Recommended Songs for Your Mood</h2>
                <button className="reset-scan-btn" onClick={resetScan}>
                  Scan Again
                </button>
              </div>
              <Playlist />
            </section>

            {/* Complete Library Grid */}
            <section className="view-library" id="music-library-section">
              <div className="library-title-row">
                <h2>Browse Complete Library (100 Songs)</h2>
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
            </section>
          </div>
        ) : (
          /* Locked State Placeholder */
          <section className="library-locked-placeholder">
            <div className="lock-icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h3>Library Locked</h3>
            <p>Please use the Face AI Scanner above to detect your current mood and unlock the music library.</p>
          </section>
        )}
      </main>

      {/* Floating Bottom Player */}
      <Player />
    </div>
  );
};

export default Home;
