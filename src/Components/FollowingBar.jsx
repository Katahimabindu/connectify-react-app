import React, { useEffect, useRef } from "react";
import { useWebSocket } from "../Context/WebSocketContext";
import "../styles.css";

function FollowingBar() {
  const { following = [], followUser } = useWebSocket();
  const scrollRef = useRef(null);

  const suggestedUsers = [
    "Virat Kohli",
    "MS Dhoni",
    "PV Sindhu",
    "APJ Abdul Kalam",
    "Sachin Tendulkar",
    "Ratan Tata",
    "Narayana Murthy",
  ];

  // ✅ AUTO SCROLL (FIXED)
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let scrollAmount = 0;

    const interval = setInterval(() => {
      scrollAmount += 1;
      container.scrollLeft = scrollAmount;

      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth
      ) {
        scrollAmount = 0;
      }
    }, 30); // speed (lower = faster)

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log("👥 Following list:", following);
  }, [following]);

  return (
    <div>
      {/* FOLLOWING */}
      <div className="follow-bar">
        <h3>Following</h3>
        <div className="suggest-scroll">
          {following.length === 0 ? (
            <span className="empty-text">
              You are not following anyone yet
            </span>
          ) : (
            following.map((u) => (
              <div key={u} className="suggest-card">
                <span className="suggest-name">{u}</span>
                <button className="suggest-btn" disabled>
                  ✓ Following
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* SUGGESTED USERS */}
      <div className="follow-bar">
        <h3>Suggested Users</h3>
        <div className="suggest-scroll auto-scroll" ref={scrollRef}>
          {[...suggestedUsers,...suggestedUsers].map((u,i) => (
            <div key={u+i} className="suggest-card">
              <span className="suggest-name">{u}</span>
              <button
                className="suggest-btn"
                onClick={() => followUser(u)}
                disabled={following.includes(u)}
              >
                {following.includes(u) ? "✓ Following" : "Follow"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FollowingBar;
