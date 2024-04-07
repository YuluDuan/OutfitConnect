'use server'

export async function createPost(prevState, formData) {
  const title = formData.get('title');
  const content = formData.get('content');
  const imageUrl = formData.get('imageUrl');

  console.log({title, content, imageUrl})

  return null;

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