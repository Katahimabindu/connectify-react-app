import React, { useEffect, useRef } from "react";
import { useWebSocket } from "../Context/WebSocketContext";
import "../index.css";

function FollowingBar() {
  // ✅ SAFETY DEFAULT (prevents crash)
  const { following = [], followUser } = useWebSocket();

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

  // ===============================
  // Auto-scroll suggested users
  // ===============================
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPos = 0;
    const getScrollSpeed = () => (window.innerWidth < 480 ? 0.5 : 1);

    const startScroll = () => {
      intervalRef.current = setInterval(() => {
        const maxScroll =
          scrollContainer.scrollWidth - scrollContainer.clientWidth;

        scrollPos += getScrollSpeed();
        if (scrollPos >= maxScroll) scrollPos = 0;

        scrollContainer.scrollTo({
          left: scrollPos,
          behavior: "smooth",
        });
      }, 50);
    };

    startScroll();

    const stopScroll = () => clearInterval(intervalRef.current);

    scrollContainer.addEventListener("mouseenter", stopScroll);
    scrollContainer.addEventListener("mouseleave", startScroll);

    return () => {
      stopScroll();
      scrollContainer.removeEventListener("mouseenter", stopScroll);
      scrollContainer.removeEventListener("mouseleave", startScroll);
    };
  }, []);

  return (
    <div>
      {/* ===============================
          FOLLOWING USERS
      =============================== */}
      <div className="follow-bar">
        <h3>Following ({following.length})</h3>

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

      {/* ===============================
          SUGGESTED USERS
      =============================== */}
      <div className="follow-bar" style={{ marginTop: "12px" }}>
        <h3>Suggested Users</h3>

        <div className="suggest-scroll" ref={scrollRef}>
          {suggestedUsers.map((user) => {
            const isFollowing = following.includes(user);

            return (
              <div key={user} className="suggest-card">
                <span className="suggest-name">{user}</span>
                <button
                  onClick={() => followUser(user)}
                  className="suggest-btn"
                  disabled={isFollowing}
                >
                  {isFollowing ? "✓ Following" : "Follow"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FollowingBar;
