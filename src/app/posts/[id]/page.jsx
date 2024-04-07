import {getPostById} from "@/actions/posts";
import {analyze} from "@/utils/prompts";
import React, {Suspense} from "react";
import Loading from "@/components/Loading";
import ItemList from "@/components/ItemList";
import {Card, CardContent, CardDescription, CardHeader, CardImage, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import {cn} from "@/lib/utils";

export default async function PostPage({params}) {
  const {id} = params;
  const {title, content, imageUrl} = await getPostById(id);


  return (
    <div>
      <Card className="w-fit">
        <CardHeader>
          <CardTitle>
            {title}
          </CardTitle>
          <CardDescription>{content}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='w-[200px] h-[200px]'>
            <Image
              src={imageUrl}
              alt="uploadedImage"
              width={200}
              height={200}
              className={cn(
                "h-[200px] w-[200px] object-cover transition-all hover:scale-105",
                "aspect-square"
              )}
            />
          </div>
        </CardContent>
      </Card>
      <Suspense fallback={<Loading/>}>
        <ItemList id={id}/>
      </Suspense>
    </div>
  )
}