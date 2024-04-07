"use client"

import { postItemsAction, getItemsAction, deleteItemsAction } from "@/actions/item.action";
import { useState } from "react";
import itemsData from '@/toyData/items_stub.json'; 

export default function Init() {
    const [itemData, setItemData] = useState(null);
    const [itemDataBack, setItemDataBack] = useState([]);

    // Function to fetch items from the JSON file
    const fetchItems = async () => {
        try {
            const postPromises = [];

            itemsData.items.forEach(async (item) => {
                try {
                    const response = await postItemsAction(item);
                    postPromises.push(response);
                } catch (error) {
                    console.error('Error posting item:', error);
                    postPromises.push({ success: false, error: error.message });
                }
            });
            const results = await Promise.all(postPromises);
            setItemData(JSON.stringify(results));
        } catch (error) {
            setItemData(error.message);
            console.error('Error fetching items:', error);
        }
    };

    const getItems = async () => {
        try {
            const response = await getItemsAction();
            if (response.success) {
                const mappedItems = [];
                response.data.forEach(async (item) => {
                    mappedItems.push(JSON.stringify(item));
                });
                setItemDataBack(mappedItems);
            } else {
                setItemDataBack(response.error.message);
                console.error('Error fetching posts:', response.error);
            }
        } catch (error) {
            setItemDataBack(response.error.message);
            console.error('Error fetching posts:', error);
        }
    };

    const deleteAllItems = async () => {
        try {
            const response = await deleteItemsAction();
            if (response.success) {
                setItemDataBack([]); // Clear the item list after deletion
                console.log('All items deleted successfully');
            } else {
                console.error('Error deleting items:', response.error);
            }
        } catch (error) {
            console.error('Error deleting items:', error);
        }
    };

    return (
        <div>
            <h1>Items</h1>
            <h2>Post</h2>
            <button style={{ backgroundColor: 'red', color: 'white' }} onClick={fetchItems}>Fetch Items</button>
            <pre>{itemData}</pre>
            <h2>Delete</h2>
            <button style={{ backgroundColor: 'red', color: 'white' }} onClick={deleteAllItems}>Delete All Items</button>
            <h2>Get</h2>
            <button style={{ backgroundColor: 'red', color: 'white' }} onClick={getItems}>Get Items</button>
            <ul>
            {itemDataBack.map((item, index) => (
                <li key={index}>
                    {item}
                </li>
            ))}
        </ul>
        </div>
    );
}
