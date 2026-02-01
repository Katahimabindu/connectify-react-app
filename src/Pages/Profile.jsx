function Profile({ user, postCount, totalLikes, totalComments }) {
  return (
    <div className="profile-card">
      <div>
        <h3>{user}</h3>
      </div>
      <div>
        <p>{postCount}</p>
        <p>Posts</p>
      </div>
      <div>
        <p>{totalLikes}</p>
        <p>Likes</p>
      </div>
      <div>
        <p>{totalComments}</p>
        <p>Comments</p>
      </div>
    </div>
  );
}

export default Profile;
