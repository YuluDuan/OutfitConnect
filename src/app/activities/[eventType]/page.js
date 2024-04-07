import { findPostsByEventType } from "@/actions/post.action"
import LandingPageHeader from "@/components/LandingPageHeader";
import PostCard from "@/components/PostCard";

const page =  async ( { params } ) => {

const posts = await findPostsByEventType(decodeURIComponent(params.eventType));
console.log(posts.data);
console.log({ params });


  return (
    <>
    <LandingPageHeader/>
    <div className="pt-[150px] px-[100px] grid grid-cols-3 gap-4 p-4">
    {posts.data.map((post, index) => (
        <PostCard key={index} title={post.title} id={post._id} imageUrl={post.imageUrl} content={post.content}/>
      ))}
    </div>
    </>
  )
}

export default page