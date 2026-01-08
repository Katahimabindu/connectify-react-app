function Profile({ user, postCount, totalLikes, totalComments }) {
  return (
    <div className="border p-4 rounded shadow-md mb-4 grid grid-cols-3 gap-3 text-center">
      <div className="col-span-3 text-xl font-bold">{user}</div>
      <div className="border p-2 rounded text-xs">
        <h3 className="font-semibold">Posts</h3>
        <p>{postCount}</p>
      </div>
      <div className="border p-2 rounded text-xs">
        <h3 className="font-semibold">Likes</h3>
        <p>{totalLikes}</p>
      </div>
      <div className="border p-2 rounded text-xs">
        <h3 className="font-semibold">Comments</h3>
        <p>{totalComments}</p>
      </div>
    </div>
  );
}

export default Profile;
