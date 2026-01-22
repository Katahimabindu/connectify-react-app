function Comments({ comments }) {
  if (!comments || comments.length === 0)
    return <p className="text-xs text-gray-400 mt-1">No comments yet</p>;

  return (
    <>
      {comments.map((c) => (
        <p key={c.id} className="text-xs border px-2 py-1 rounded mt-1">
          {c.name}: {c.content}
        </p>
      ))}
    </>
  );
}

export default Comments;