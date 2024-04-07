

async function fetchAPI(endpoint, method = 'GET', data = null) {
	try {
		const options = {
			method,
			headers: {
				'Content-Type': 'application/json'
			},
			body: data ? JSON.stringify(data) : null
		};

		const response = await fetch(`/api/${endpoint}`, options);
		if (!response.ok) {
			throw new Error(`Failed to ${method} data from /api/${endpoint}`);
		}
		const responseData = await response.json();
		return responseData;
	} catch (error) {
		throw new Error(`Failed to ${method} data`);
	}
}


async function createPost(postData) {
    try {
        const data = await fetchAPI('posts', 'POST', postData);
        return { success: true, error: null, data: null };
    } catch (error) {
        return { success: false, error: 'Failed to create post', data: null };
    }
}

async function getPosts() {
    try {
        const data = await fetchAPI('posts');
        return { success: true, error: null, data: data };
    } catch (error) {
        return { success: false, error: 'Failed to get posts', data: null };
    }
}

async function deleteAllPosts() {
    try {
        const data = await fetchAPI('posts', 'DELETE');
        return { success: true, error: null, data: null };
    } catch (error) {
        return { success: false, error: 'Failed to delete posts', data: null };
    }
}

async function updatePostById(id, postData) {
    try {
        const data = await fetchAPI(`post/${id}`, 'PUT', postData);
        return { success: true, error: null, data: null };
    } catch (error) {
        return { success: false, error: 'Failed to update post', data: null };
    }
}

async function deletePostById(id) {
    try {
        const data = await fetchAPI(`post/${id}`, 'DELETE');
        return { success: true, error: null, data: null };
    } catch (error) {
        return { success: false, error: 'Failed to delete post', data: null };
    }
}