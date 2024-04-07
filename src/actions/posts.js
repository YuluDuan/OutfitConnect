'use server'

import {auth} from "../../auth";
import connectDB from "@/db/dbConnect";
import {PostSchema} from "@/db/schema";
import {revalidatePath} from "next/cache";

export async function createPost(prevState, formData) {
  const session = await auth();
  const user = session.user;

  const title = formData.get('title');
  const content = formData.get('content');
  const imageUrl = formData.get('imageUrl');
  const posterId = user.email;

  console.log({title, content, imageUrl})

  const clothingItemsInImage = null;
  const eventType = null;
  const actualItemLinks =  null;
  await connectDB();
  try {
    const posts = await PostSchema.create({posterId:posterId, title, imageUrl, content, eventType, clothingItemsInImage, actualItemLinks})
    revalidatePath("/");
    return { success: true, message: "Posted!", data: null };
  } catch (err) {
    console.log(err.message);
    return { success: false, message: err.message, data: null };
  }



  // validate input
  // if (!newStatus) {
  //   return {
  //     isError: true,
  //     message: `Missing status name.`,
  //   };
  // }
  //
  // const collectionPath = 'workflowConfigs/default/statuses';
  //
  // // check if name already exist
  // const q = query(
  //   collection(db, collectionPath),
  //   where('name', '==', newStatus)
  // );
  // const q_snapshot = await getDocs(q);
  //
  // if (!q_snapshot.empty) {
  //   return {
  //     isError: true,
  //     message: `Status "${newStatus}" already exists.`,
  //   };
  // }
  //
  // // create new status
  // await addDoc(collection(db, collectionPath), {
  //   name: newStatus,
  //   isEnd,
  //   actionCount: 0,
  //   canEdit: false,
  // });
  //
  // revalidatePath('/admin/workflowConfig');
  //
  // return {
  //   isError: false,
  //   message: `Status "${newStatus}" successfully added!`,
  // };
}