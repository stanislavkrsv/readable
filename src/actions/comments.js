import * as ReadableAPI from '../utils/ReadableAPI'
import moment from 'moment'
import uuidv4 from 'uuid/v4'
import  { saveUserName } from './user'
import {
  REQUEST_COMMENTS,
  RECEIVE_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT,
  DELETE_POSTS_COMMENTS,
  SET_COMMENT_SORT_COLUMN,
  VOTE_COMMENT,
  SET_COMMENT_OVERLAY_BLOCK,
  SET_NEW_COMMENT_OVERLAY_BLOCK
} from './types'

export const requestComments  = () => ({
  type: REQUEST_COMMENTS,
})

export const receiveComments  = (postId, comments) => ({
  type: RECEIVE_COMMENTS,
  postId: postId,
  comments: comments
})

const fetchComments = (postId) => dispatch => {
  dispatch(requestComments(postId))
  return ReadableAPI.getPostComments(postId).then(comments => {dispatch(receiveComments(postId, comments))})
}

const shouldFetchComments = (postId, state) => {
  const comments = state.comments
  if (!comments || !comments[postId]) {
    return true
  }
  if (comments[postId].isFetching) {
    return false
  }
  return false
}

export const fetchCommentsIfNeeded = (postId) => (dispatch, getState) => {
  if (shouldFetchComments(postId, getState())) {
    return dispatch(fetchComments(postId))
  }
}


/**
 * Comment sort columns
 * @type {{SCORE: string, TIMESTAMP: string}}
 */
export const sortColumns = {
  SCORE: '-voteScore',
  TIMESTAMP: '-timestamp',
}

export const setCommentSortColumn = (sortColumnName) => {
  return {
    type: SET_COMMENT_SORT_COLUMN,
    sortColumnName
  }
}


/**
 * Vote comment
 */
export const voteCommentComplete = (id, postId, voteScore) => ({
  type: VOTE_COMMENT,
  id: id,
  postId,
  voteScore: voteScore
})

export const voteComment = (id, postId, option) => (dispatch) => {
  ReadableAPI.voteComment(id, option).then((comment) => {
    return dispatch(voteCommentComplete(id, postId, comment.voteScore))
  });
}


/**
 * Show comment's overlay block
 * @param id
 * @param postId
 * @param value
 */
export const setCommentOverlayBlock = (id, postId, value) => ({
  type: SET_COMMENT_OVERLAY_BLOCK,
  id: id,
  postId: postId,
  value: value
})


/**
 * Delete
 */
export const deleteComment = (id, postId) => ({
  type: DELETE_COMMENT,
  id: id,
  postId: postId,
})

export const makeDeleteCommentRequest = (id, postId) => (dispatch) => {
  dispatch(setCommentOverlayBlock(id, postId, true))
  return ReadableAPI.deleteComment(id).then(() => {
    dispatch(deleteComment(id, postId))
  })
}

/**
 * Delete Post's comments
 */
export const deletePostsComments = (postId) => ({
  type: DELETE_POSTS_COMMENTS,
  postId: postId,
})


/**
 * Update
 * @param id
 * @param postId
 * @param body
 */
export const makeUpdateCommentRequest = (id, postId, body) => (dispatch) => {
  dispatch(setCommentOverlayBlock(id, postId, true))

  return ReadableAPI.updateComment(id, moment().valueOf(), body)
    .then((comment) => {
      dispatch(updateComment(id, postId, comment));
      dispatch(setCommentOverlayBlock(id, postId, false))
  })
}

export const updateComment = (id, postId, newComment) => ({
  type: UPDATE_COMMENT,
  id,
  postId,
  newComment
})


/**
 * Create
 * @param postId
 * @param author
 * @param body
 */
export const makeCreateCommentRequest = (postId, author, body) => (dispatch) => {
  let comment = {
    id : uuidv4(),
    parentId: postId,
    timestamp : moment().valueOf(),
    author: author,
    body : body,
    voteScore: 1,
    deleted: false
  }
  dispatch(setNewCommentOverlayBlock(true))
  dispatch(saveUserName(author))
  return ReadableAPI.addComment(comment, postId).then((comment) => {
    dispatch(addComment(comment));
    dispatch(setNewCommentOverlayBlock(false))
  })
}

export const addComment = (comment) => ({
  type: ADD_COMMENT,
  newComment: comment
})

export const setNewCommentOverlayBlock = (value) => ({
  type: SET_NEW_COMMENT_OVERLAY_BLOCK,
  value: value
})