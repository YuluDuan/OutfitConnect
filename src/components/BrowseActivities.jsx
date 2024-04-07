import Link from "next/link";
import Image from "next/image";
import { findThreeTopActivities } from "@/actions/post.action";

const BrowseActivities = async () => {

  const activities = await findThreeTopActivities();

  return (

    <>
    <div className="pb-[20px] text-left">BrowseActivities</div>
    <div className="flex flex-row gap-5 items-center pb-[20px] mx-auto">
    {activities.data.map((post, index) => (
        <Link key={`${index + 23}`} href={`activities/${post.eventType}`}>
        <Image src={post.imageUrl} alt={`Image ${index }`} height={100} width={100} className="w-[100px] h-[100px] rounded-full overflow-hidden"/>
        <p className="text-center">{post.eventType}</p>
        </Link>
      ))}
    </div>
    </>
  )
}

export default BrowseActivities