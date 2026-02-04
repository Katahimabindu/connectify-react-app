import { useEffect, useRef } from "react";
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

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let x = 0;
    const id = setInterval(() => {
      x += 1;
      el.scrollLeft = x;
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth) {
        x = 0;
      }
    }, 25);

    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <div className="follow-bar">
        <h3>Following</h3>
        <div className="suggest-scroll">
          {following.length === 0 ? (
            <span style={{ fontSize: 12, color: "#888" }}>
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

      <div className="follow-bar">
        <h3>Suggested Users</h3>
        <div className="suggest-scroll" ref={scrollRef}>
          {suggestedUsers.map((u) => (
            <div key={u} className="suggest-card">
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
