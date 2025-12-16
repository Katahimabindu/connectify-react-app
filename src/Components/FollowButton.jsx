// Dumb component: receives props only
function FollowButton({ following, onFollow }) {
  return (
    <button onClick={onFollow}>
      {/* Show 'Following' if following, 'Follow' otherwise */}
      {following ? "Following" : "Follow"}
    </button>
  );
}

export default FollowButton;
