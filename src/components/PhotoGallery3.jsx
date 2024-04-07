import { getThreePosts } from "@/actions/post.action";
import Image from "next/image";

const PhotoGallery3 = async () => {

  const posts = await getThreePosts();

  return (
    <>
    <div className='pt-[130px] pb-[20px] text-left'>SHARE YOUR RADICAL EVOLUTION #LIVEITUP</div>
    <div className="flex flex-row gap-5 items-center pb-[20px] mx-auto">
    {posts.data.map((post, index) => (
        <Image key={index} src={post.imageUrl} alt={`Image ${index + 989}`} height={220} width={220}/>
      ))}
    </div>
    </>
  )
}

export default PhotoGallery3