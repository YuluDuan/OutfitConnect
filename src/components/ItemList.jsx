import {analyze} from "@/utils/prompts";
import {getPostById} from "@/actions/posts";
import {match} from "@/utils/matching";
import Item from "@/components/Item";
import ItemInImage from "@/components/ItemInImage";
import { Badge } from "@/components/ui/badge"
 


export default async function ItemList({id}) {
  function isValidObjectId(id) {
    return /^[0-9a-fA-F]{24}$/.test(id);
  }

  if (!isValidObjectId(id)) return null;

  const post = await getPostById(id);
  const {eventType, clothingItemsInImage} = await analyze(id, post.imageUrl);
  const matchedItemIds = await match(clothingItemsInImage) || [];

  const itemsInImage =clothingItemsInImage;
  console.log(itemsInImage)

  return (
    <div>
      <Badge className="mb-[20px]">{eventType.charAt(0).toUpperCase() + eventType.slice(1)}</Badge>
      <div className="flex flex-row gap-5">
      <div>
        {
          itemsInImage.map((item, index) => <ItemInImage key={index} item={item}/>)
        }
      </div>
      <div className="flex flex-col gap-[20px]">
        {
          matchedItemIds.map((id) => <Item key={id} itemId={id}/>)
        }
      </div>
      </div>
    </div>
  )
}