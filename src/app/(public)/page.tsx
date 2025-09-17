import {getPosts} from "@/lib/post"
import PostCard from "@/components/post/post"
import {Post} from "@/types/post"

export default async function PostPage() {
  const posts = await getPosts() as Post[]
  console.log(posts)
  return (
    <div className="conteiner mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg-grid-cols-3 gap-6">
        {posts.map ((post)=>(
          <PostCard key={post.id} post={post}/>
        ))}

      </div>

    </div>
  )
}
