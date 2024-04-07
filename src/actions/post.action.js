"use server"

async function fetchAPI(endpoint, method = 'GET', data = null) {
	try {
		const options = {
			method,
			headers: {
				'Content-Type': 'application/json'
			},
			body: data ? JSON.stringify(data) : null
		};

		const response = await fetch(`http://localhost:3000/api/${endpoint}`, options);
		if (!response.ok) {
			throw new Error(`Failed to ${method} data from /api/${endpoint}`);
		}
		const responseData = await response.json();
		return responseData;
	} catch (error) {
		throw error;
	}
}


export async function createPostAction(postData) {
    try {
        const data = await fetchAPI('posts', 'POST', postData);
        return { success: true, error: null, data: null };
    } catch (error) {
        return { success: false, error: error.message, data: null };
    }
}

export async function getPostsAction() {
    try {
        const data = await fetchAPI('posts', 'GET');
        return { success: true, error: null, data: data };
    } catch (error) {
        return { success: false, error: error.message, data: null };
    }
}

export async function deleteAllPostsAction() {
    try {
        const data = await fetchAPI('posts', 'DELETE');
        return { success: true, error: null, data: null };
    } catch (error) {
        return { success: false, error: error.message, data: null };
    }
}

export async function updatePostByIdAction(id, postData) {
    try {
        const data = await fetchAPI(`post/${id}`, 'PUT', postData);
        return { success: true, error: null, data: null };
    } catch (error) {
        return { success: false, error: error.message, data: null };
    }
}

export async function deletePostByIdAction(id) {
    try {
        const data = await fetchAPI(`post/${id}`, 'DELETE');
        return { success: true, error: null, data: null };
    } catch (error) {
        return { success: false, error: error, data: null };
    }
}