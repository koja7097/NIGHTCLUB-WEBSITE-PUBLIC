import React from "react"
import { Navigation } from "@/components/navigation"
import { mockFeed } from "@/lib/mockData"
export default function GalleryPage() {

    return (
        <main>
              <main>
                     <Navigation/>
                 <div className="p-4">
             <h1 className="text-3xl font-bold text-center mb-8">Club Gallery</h1>

             <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
                {mockFeed.map((post)=> (
                    <div key={post.id}
                    className="bg-dark shadow rounded-lg overflow-hidden hover:shadow-lg transition"
                    >
                     <img src={post.media}
                     alt={post.caption} 
                     className="w-full h-48 object-cover"
                     />
                     <div className="p-3">
                        <p className="text-sm">{post.caption}</p>
                        <p className="text-xs text-dark-500">{new Date(post.createdAt).toLocaleDateString()}</p>
                     </div>
                    </div>
                ))}
             </div>
                 </div>
                 </main>
        </main>
    )
}