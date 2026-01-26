function Profile({ user, posts }) {
  const postCount = posts.length;

  const totalLikes = posts.reduce(
    (sum, p) => sum + p.likes.length,
    0
  );

  const totalComments = posts.reduce(
    (sum, p) => sum + p.comments.length,
    0
  );

  return (
    <div className="profile-card">
      <h3>{user}</h3>

      <div><b>{postCount}</b><p>Posts</p></div>
      <div><b>{totalLikes}</b><p>Likes</p></div>
      <div><b>{totalComments}</b><p>Comments</p></div>
    </div>
  );
}

export default Profile;
