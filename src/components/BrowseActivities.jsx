//hardcode if no result then show no result page

import Link from "next/link";
import Image from "next/image";

const BrowseActivities = () => {

    const activities = [
        {
            eventType: "BIKING",
            imageUrl:"/assets/bg-image.jpg"
        },

        {
            eventType: "BIKING",
            imageUrl:"/assets/bg-image.jpg"
        }
      ];
  return (

    <>
    <div className="pb-[20px] text-left">BrowseActivities</div>
    <div className="flex flex-row gap-5 items-center pb-[20px] mx-auto">
    {activities.map((post, index) => (
        <Link href={`activities/${post.eventType}`}>
        <Image key={index} src={post.imageUrl} alt={`Image ${index + 666}`} height={100} width={100} className="w-[100px] h-[100px] rounded-full overflow-hidden"/>
        <p className="text-center">{post.eventType}</p>
        </Link>
      ))}
    </div>
    </>
  )
}

export default BrowseActivities