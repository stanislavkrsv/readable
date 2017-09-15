import * as ReadableAPI from '../utils/ReadableAPI'
import moment from 'moment'
import uuidv4 from 'uuid/v4'
import  { saveUserName } from './user'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SET_POST_SORT_COLUMN = 'SET_POST_SORT_COLUMN'
export const VOTE_POST = 'VOTE_POST'
export const SET_POST_OVERLAY_BLOCK = 'SET_POST_OVERLAY_BLOCK'
export const ADD_POST = 'ADD_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const DELETE_POST = 'DELETE_POST'

export const requestPosts = () => ({
  type: REQUEST_POSTS,
})

export const receivePosts = (posts) => ({
  type: RECEIVE_POSTS,
  posts: posts
})

const fetchPosts = () => dispatch => {
  dispatch(requestPosts())
  return ReadableAPI.getPosts().then(posts => {
    dispatch(receivePosts(
      posts.filter(post => post.deleted === false)
    ))
  })
}

const shouldFetchPosts = (state) => {
  const posts = state.posts
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  if (!posts.items.length) {
    return true
  }
}

export const fetchPostsIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchPosts(getState())) {
    return dispatch(fetchPosts())
  }
}


/**
 * Posts sort columns
 * @type {{SCORE: string, TIMESTAMP: string}}
 */
export const sortColumns = {
  SCORE: '-voteScore',
  TIMESTAMP: '-timestamp',
}

export const setPostSortColumn = (sortColumnName) => {
  return {
    type: SET_POST_SORT_COLUMN,
    sortColumnName
  }
}

export const votePostComplete = (id, voteScore) => ({
  type: VOTE_POST,
  id: id,
  voteScore: voteScore
})

export const votePost = (id, option) => (dispatch) => {
    ReadableAPI.votePost(id, option).then((post) => {
      return dispatch(votePostComplete(post.id, post.voteScore))
    });
}

export const setPostOverlayBlock = (id, value) => ({
  type: SET_POST_OVERLAY_BLOCK,
  id: id,
  postOverlayValue: value
})

export const deletePost = (id) => ({
  type: DELETE_POST,
  id: id,
})

export const makeDeletePostRequest = (id) => (dispatch) => {
  dispatch(setPostOverlayBlock(id, true))
  return ReadableAPI.deletePost(id).then(() => {
    dispatch(deletePost(id))
  })
}

export const addPost = (post) => ({
  type: ADD_POST,
  post
})

export const makeCreatePostRequest = (title, body, author, category) => (dispatch) => {
  let post = {
    id : uuidv4(),
    timestamp : moment().valueOf(),
    author: author,
    title : title,
    body : body,
    category : category,
    voteScore: 1,
    deleted: false
  }
  dispatch(saveUserName(author))
  return ReadableAPI.addPost(post).then((newPost) => {
    dispatch(addPost(newPost));
  })
}

export const updatePost = (id, post) => ({
  type: UPDATE_POST,
  id,
  post
})

export const makeUpdatePostRequest = (id, title, body) => (dispatch) => {
  return ReadableAPI.updatePost(id, title, body)
    .then((post) => dispatch(updatePost(id, post)))
}