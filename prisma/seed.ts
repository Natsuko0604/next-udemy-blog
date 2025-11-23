import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma =  new PrismaClient({
    datasources: {
      db: {
        url: "file:./dev.db", // SQLite の場合
      },
    },
  });

async function main(){
    await prisma.post.deleteMany()
    await prisma.user.deleteMany()

    const hashedPassword = await bcrypt.hash('password123', 12)

    const dummyImages = [
        'https://picsum.photos/seed/post1/600/400',
        'https://picsum.photos/seed/post2/600/400'

    ]

    const user = await prisma.user.create({
        data:{
            email: 'test@example.com',
            name: 'test user',
            password: hashedPassword,
            posts: {
                create: [
                    {
                        title: '初めてのブログ投稿',
                        content: 'これは最初のブログ投稿です。',
                        topImage: dummyImages[0],
                        published: true
                    },{
                        title: '2番目のブログ投稿',
                        content: 'これは2番目のブログ投稿です。',
                        topImage: dummyImages[1],
                        published: true
                    }
                ]
            }
        }
    })
    // console.log("kaisi")
    console.log({ user })
    // console.log("owari")

}

main()
    .catch((e)=>{
        console.error(e)
        process.exit(1)
    })

    .finally(async()=>{
        await prisma.$disconnect()
    })