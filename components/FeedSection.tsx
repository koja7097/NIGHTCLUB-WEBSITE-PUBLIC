import React from "react";
import { FeedPost } from "@/lib/mockData";

type FeedProps = {
    feed: FeedPost[]
    newPost: FeedPost
    setNewPost: (p: FeedPost) => void
    addPost: () => void
}

export default function FeedSection({feed, newPost, setNewPost, addPost}: FeedProps) {
    return (
        <div>
             {/* Feed section */}
        <section className="bg-dark shadow-md rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4">Daily Updates (Feed)</h2>

            {/* addPost */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
         <input
         type="text"
         placeholder="Caption"
         value={newPost.caption}
         onChange={(e)=> setNewPost({...newPost, caption: e.target.value})}
         className="border p-2 rounded flex-1"
         />
             <input
         type="text"
         placeholder="Image/Video URL"
         value={newPost.media}
         onChange={(e)=> setNewPost({...newPost, media: e.target.value})}
         className="border p-2 rounded flex-1"
         />
                <button
            onClick={addPost}
            className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-700">Post</button>
        </div>

        {/* Feed List */}
        <div className="grid md:grid-cols-3 gap-4">
            {feed.map((post)=> (
                <div key={post.id} className="border p-3 rounded-lg">
                    <img src={post.media} alt="feed"
                    className="rounded-md w-full h-40 object-cover"/>
                    <p className="mt-2 text-sm">{post.caption}</p>
                    <p className="text-xs text-gray-500">{new Date(post.createdAt).toDateString()}</p>
                </div>
            ))}
        </div>
        </section>
        </div>
    )
}