export type Post = {
    id: string
    title: string
    contents: string
    topImage: string | null
    createdAt: Date
    author: {
        name: string
    }
}

export type PostCardProps = {post:Post}