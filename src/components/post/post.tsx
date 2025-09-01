import { formatDistanceToNow } from 'date-fns'
import { ja } from 'date-fns/locale'
import Link from 'next/link'

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { PostCardProps } from '@/types/post'

export default function Post({post}: PostCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
        <Link href={`/posts/${post.id}`}>
        <CardHeader>
            <CardTitle className='line-clamp-2'>{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className='text-sm text-gray-600 mb-2 line-clamp-2'>
                {post.contents}
                </p>
                <div className='flex items-center justify-between text-sm text-gray-500'>
                    <span>{post.author.name}</span>
                    <time>{formatDistanceToNow(new Date(post.createdAt),
                {addSuffix: true,
                    locale: ja
                })}</time>

                </div>
        </CardContent>
        </Link>
    </Card>
    )
}
