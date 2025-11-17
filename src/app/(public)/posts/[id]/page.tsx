import { getPost } from "@/lib/post"
import { notFound } from "next/navigation"
import Image from 'next/image'
import {format} from 'date-fns'
import {ja} from 'date-fns/locale'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"

type Params = {
    params: Promise<{id: string}>
}

// console.log("params.id:")
// console.log("post:")


export default async function Postpage({params} :Params) {
  // console.log("params.id:", params.id)
    const {id}=  await params;
    // console.log("idは"+id)
    const post = await getPost(id)

    if(!post){
        notFound()
    }
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mx-w-3xl max-auto">
      {post.topImage && (
            <div className='relative w-full h-64 lg:h-96'>
                <Image
                src={post.topImage}
                alt={post.title}
                fill
                sizes="100vw"
                className='rounded-t-md object-cover'
                priority
                />

            </div>
        )}
        <CardHeader className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-500">
              投稿者：{post.author.name}
            </p>
            <time className="text-sm text-gray-500">
            {format(new Date(post.createdAt), 'yyyy年MM月dd日', {locale: ja })}
            </time>
          </div>
          <CardTitle className="3xl font-bold">{post.title}</CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>

    </div>
  )
}
