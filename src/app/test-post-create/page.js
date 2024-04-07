"use client"

import { createPostAction } from "@/actions/post.action";
import { useState, useEffect } from "react";

export default function YourComponent() {
    const [postData, setPostData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const postData = {   
                    posterId : null,
                    title : "Hello",
                    imageUrl : "an image",
                    content : "a good world",
                    eventType : null,
                    clothingItemsInImage : null,
                    actualItemLinks : null
                }

                const response = await postPostAction(postData);
                if (response.success) {
                    setPostData(JSON.stringify(response.data));
                } else {
                    setPostData(response.error.message);
                    console.error('Error fetching posts:', response.error);
                }
            } catch (error) {
                setPostData(response.error.message);
                console.error('Error fetching posts:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Posts</h1>
            <pre>{postData}</pre>
        </div>
    );
}
