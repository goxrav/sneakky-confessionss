import React from "react";

function PostCard({ post }) {
  return (
    <div className="bg-gray-100 rounded-lg shadow p-4 mb-4">
      <p className="text-gray-800 mb-2">{post.message}</p>
      <div className="flex justify-between text-sm text-gray-600">
        <div>
          👍 {post.upvotes} | 👎 {post.downvotes}
        </div>
        <button className="text-red-500 hover:underline">Report</button>
      </div>
    </div>
  );
}

export default PostCard;
