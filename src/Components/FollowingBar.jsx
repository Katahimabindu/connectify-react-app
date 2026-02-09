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

  // ✅ Smooth infinite autoscroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let rafId;
    const speed = 0.5;

    const autoScroll = () => {
      el.scrollLeft += speed;

      // reset at halfway because list is duplicated
      if (el.scrollLeft >= el.scrollWidth / 2) {
        el.scrollLeft = 0;
      }

      rafId = requestAnimationFrame(autoScroll);
    };

    rafId = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div>
      {/* FOLLOWING (static, no autoscroll) */}
      <div className="follow-bar">
        <h3>Following</h3>

        <div className="suggest-scroll">
          {following.map((u) => (
            <div key={u} className="suggest-card">
              <span className="suggest-name">{u}</span>
              <button className="suggest-btn" disabled>
                ✓ Following
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SUGGESTED USERS (autoscroll here) */}
      <div className="follow-bar">
        <h3>Suggested Users</h3>

        <div className="suggest-scroll" ref={scrollRef}>
          {[...suggestedUsers, ...suggestedUsers].map((u, i) => (
            <div key={i} className="suggest-card">
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
