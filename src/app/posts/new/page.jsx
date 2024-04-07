import CreatePostForm from "@/components/CreatePostForm";

export default function NewPostPage() {
  return(
    <div className="flex">
      <div className="w-8/12 mx-auto">
        <h1 className="text-4xl font-bold px-6 py-10">Post your adventure!</h1>
        <div className="text-4xl px-6">
          <CreatePostForm/>
        </div>
      </div>
    </div>
  )
}


// POST add post
// title, image_url, content

// PATCH /posts/:id
// eventType, clothingItems, itemsIdLinked

// data model
// USER
//     id
//     email
//     name

// POSTS
//      id
//      posterId: USERid
//      title
//      image_url
//      content
//      eventType
//      list[clothingItemsInImage: { color: 'blue', category: 'jacket', features: [ 'zipper' ] },]
//      list[actualItemLinks: ITEMid]

// ITEMs
// url to actual website
// name
// description: { color: 'blue', category: 'jacket', features: [ 'zipper' ]}




