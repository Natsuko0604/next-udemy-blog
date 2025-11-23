import {z} from "zod"

export const postSchema = z.object({
    title: z.string()
    .min(3, {message: "タイトルは3文字以上で入力して下さい"})
    .max(255, {message: "タイトルは255文字以内で入力して下さい"}),
    content: z.string()
    .min(10, {message:"メッセージは10文字以上で入力して下さい"}),
    topImage: z.instanceof(File).nullable().optional()
});
