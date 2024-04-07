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
    <Card className="min-h-[550px] relative py-5">
      <CardContent className="flex flex-col gap-[15px] justify-center" >
          <div className="overflow-hidden">
          <Image src={imageUrl} height={200} width={200} alt="hiking image" className="rounded-lg card" style={{ marginBottom: '0px' }}/>
          </div>
          <CardTitle>{title}</CardTitle>
        <p>{content}</p>
      </CardContent>
      <CardFooter className="absolute bottom-0 left-50 right-0 py-5
      ">
          <Link href={`/posts/${id}`}>
          <Button>Explore the Outfits!</Button>
          </Link>
      </CardFooter>
    </Card>
  
  )
}

export default PostCard