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
    <div className="flex flex-row py-[50px] px-[50px] gap-[50px]">
      <div className='w-[400px] h-[500px]'>
            <Image
              src={imageUrl}
              alt="uploadedImage"
              width={400}
              height={500}
              className={cn(
                "h-[500px] w-[400px] object-cover rounded-lg transition-all hover:scale-105",
                "aspect-square"
              )}
            />
      </div>

      <div className="flex flex-col gap-[25px] w-[450px] h-[400px]">

      <h1 className="text-2xl font-bold">
        {title}
      </h1>
      <p>{content}</p>
      <Suspense fallback={<Loading/>}>
        <ItemList id={id}/>
      </Suspense>

      </div>
    </div>
  )
}