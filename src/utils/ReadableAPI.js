const api = process.env.READABLE_APP_API_URL || 'http://localhost:5001'


// Generate a unique token
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

/**
 * Get all of the categories available for the app
 */
export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

/**
 * Get all of the posts.
 */
export const getPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())


/**
 * Get all the comments for a single post
 * @param id
 */
export const getPostComments = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())

/**
 * Used for voting on a post
 * @param id
 * @param option
 */
export const votePost = (id, option) =>
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option })
  }).then(res => res.json())


/**
 * Sets the deleted flag for a post to 'true'.
 * Sets the parentDeleted flag for all child comments to 'true'.
 * @param id
 */
export const deletePost = (id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers: headers
  })


/**
 * Used for voting on a comment
 */
export const voteComment = (id, option) =>
  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option })
  }).then(res => res.json())


/**
 * Sets a comment's deleted flag to 'true'
 * @param id
 */
export const deleteComment = (id) =>
  fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers: headers
  })


/**
 * Edit the details of an existing comment
 * @param id
 * @param timestamp
 * @param body
 */
export const updateComment = (id, timestamp, body) =>
  fetch(`${api}/comments/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        timestamp,
        body
      })
  }).then(res => res.json())


/**
 * Add a comment to a post
 * @param comment
 * @param parentId
 */
export const addComment = (comment, parentId) =>
   fetch(`${api}/comments/`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  }).then(res => res.json())


/**
 * Add a new post
 * @param post
 */
export const addPost = (post) =>
  fetch(`${api}/posts/`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(res => res.json())

/**
 * Edit the details of an existing post
 * @param id
 * @param title
 * @param body
 */
export const updatePost = (id, title, body) =>
  fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title : title, body : body })
  }).then(res => res.json())