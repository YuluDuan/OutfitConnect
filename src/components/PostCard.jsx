import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "./ui/button"
import Link from "next/link"
import Image from "next/image"


const PostCard = ({title, id,  imageUrl, content}) => {
  return (
    <Card className="min-h-[500px] relative py-5">
    <CardContent className="flex flex-col gap-[20px] justify-center">
        <div className="overflow-hidden">
        <Image src={imageUrl} height={200} width={200} alt="hiking image" className="rounded-lg card"/>
        </div>
        <CardTitle>{title}</CardTitle>
      <p>{content}</p>
    </CardContent>
    <CardFooter className="absolute bottom-0 right-2">
        <Link href={`/post/${id}`}>
        <Button>Explore the Outfits!</Button>
        </Link>
        
    </CardFooter>
  </Card>
  
  )
}

export default PostCard