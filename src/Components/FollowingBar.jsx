import React, { useEffect, useRef } from "react";
import { useWebSocket } from "../Context/WebSocketContext";
import "../styles.css";

function FollowingBar() {
  const { following, followUser } = useWebSocket();

  const suggestedUsers = [
    "Virat Kohli",
    "MS Dhoni",
    "PV Sindhu",
    "APJ Abdul Kalam",
    "Sachin Tendulkar",
    "Ratan Tata",
    "Narayana Murthy",
  ];

  const scrollRef = useRef(null);
  const intervalRef = useRef(null);

  // Auto-scroll suggested users
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPos = 0;
    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;

    const getScrollSpeed = () => (window.innerWidth < 480 ? 0.5 : 1); // slower on mobile

    const startScroll = () => {
      intervalRef.current = setInterval(() => {
        scrollPos += getScrollSpeed();
        if (scrollPos > maxScroll) scrollPos = 0;
        scrollContainer.scrollTo({ left: scrollPos, behavior: "smooth" });
      }, 50);
    };

    startScroll();

    // Pause on hover
    scrollContainer.addEventListener("mouseenter", () =>
      clearInterval(intervalRef.current)
    );
    scrollContainer.addEventListener("mouseleave", startScroll);

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div>
      {/* ===== Following Users Bar ===== */}
      <div className="follow-bar">
        <h3>Following</h3>
        <div className="suggest-scroll">
          {following.length === 0 ? (
            <span style={{ fontSize: "12px", color: "#888" }}>
              You are not following anyone yet
            </span>
          ) : (
            following.map((user) => (
              <div key={user} className="suggest-card">
                <span className="suggest-name">{user}</span>
                <button className="suggest-btn" disabled>
                  ✓ Following
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ===== Suggested Users Scroll ===== */}
      <div className="follow-bar" style={{ marginTop: "12px" }}>
        <h3>Suggested Users</h3>
        <div className="suggest-scroll" ref={scrollRef}>
          {suggestedUsers.map((user) => (
            <div key={user} className="suggest-card">
              <span className="suggest-name">{user}</span>
              <button
                onClick={() => followUser(user)}
                className="suggest-btn"
                disabled={following.includes(user)}
              >
                {following.includes(user) ? "✓ Following" : "Follow"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FollowingBar;
