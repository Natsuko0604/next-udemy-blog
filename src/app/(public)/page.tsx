import {getPosts, searchPosts} from "@/lib/post"
import PostCard from "@/components/post/post"
import {Post} from "@/types/post"
import { SearchParams } from "next/dist/server/request/search-params"

type searchParams = {
  search? : string
}

export default async function PostPage(
  {searchParams}:{searchParams: Promise<SearchParams>}) {

   const resolvedSearchParams = await searchParams
   const searchValue = resolvedSearchParams.search
   const query = Array.isArray(searchValue) ? searchValue[0] || "" : searchValue || ""

const posts = query
? await searchPosts(query) as Post[]
: await getPosts() as Post[]

  // const posts = await getPosts() as Post[]
  console.log(posts)
  return (
    // <>
    <div className="conteiner mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg-grid-cols-3 gap-6">
        {posts.map ((post)=>(
          <PostCard key={post.id} post={post}/>
        ))}

      </div>

    </div>
  )
}
