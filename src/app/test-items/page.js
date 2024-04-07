"use client"

import { getItemsAction } from "@/actions/item.action";
import { useState, useEffect } from "react";

export default function YourComponent() {
    const [postData, setPostData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getItemsAction();
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
