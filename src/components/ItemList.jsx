import {analyze} from "@/utils/prompts";
import {getPostById} from "@/actions/posts";
import {match} from "@/utils/matching";
import Item from "@/components/Item";
import ItemInImage from "@/components/ItemInImage";

export default async function ItemList({id}) {
  const post = await getPostById(id);
  const {eventType, clothingItemsInImage} = await analyze(id, post.imageUrl);
  const matchedItemIds = await match(clothingItemsInImage) || [];

  const itemsInImage = JSON.parse(JSON.stringify(clothingItemsInImage));
  console.log("itemsInImage")
  console.log(itemsInImage)

  return (
    <div>
      <div>{`Event Type: ${eventType}`}</div>
      <div>
        <p>Items recognized in the image:</p>
        {
          itemsInImage.map((item, index) => <ItemInImage key={index} item={item}/>)
        }
      </div>
      <div>
        <p>Items that matches the items in the image:</p>
        {
          matchedItemIds.map((id) => <Item key={id} itemId={id}/>)
        }
      </div>
    </div>
  )
}