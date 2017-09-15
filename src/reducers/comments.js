import { sortColumns } from '../actions/comments'
import {
  REQUEST_COMMENTS,
  RECEIVE_COMMENTS,
  SET_COMMENT_SORT_COLUMN,
  SET_COMMENT_OVERLAY_BLOCK,
  SET_NEW_COMMENT_OVERLAY_BLOCK,
  VOTE_COMMENT,
  ADD_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT,
} from '../actions/types'

const initialCommentsState = {
  sortBy : sortColumns.SCORE,
  showNewCommentOverlayBlock: false
}

function comments(state = initialCommentsState , action) {

  const { id, postId, comments, sortColumnName, voteScore, value, newComment } = action

  switch (action.type) {
    case REQUEST_COMMENTS:
      return {
        ...state,
        [postId]: {
          ...state[postId],
          init: false,
          isFetching: true,
          items: []
        }
      }
    case RECEIVE_COMMENTS:
      return {
        ...state,
        [postId]: {
          ...state[postId],
          isFetching: false,
          items: comments,
          init: true,
        }
      }
    case ADD_COMMENT:
      return {
        ...state,
        [newComment.parentId]: {
          ...state[newComment.parentId],
          items: [
            ...state[newComment.parentId].items,
            newComment
          ]
        }
      }
    case DELETE_COMMENT:
      return {
        ...state,
        [postId]: {
          ...state[postId],
          items: state[postId].items.filter(comment => comment.id !== id)
        }
      }
    case UPDATE_COMMENT:
      return {
        ...state,
        [postId]: {
          ...state[postId],
          items: state[postId].items.map(comment => comment.id === id ? newComment : comment)
        }
      }
    case SET_COMMENT_SORT_COLUMN:
      return {
        ...state,
        sortBy: sortColumnName
      }
    case SET_COMMENT_OVERLAY_BLOCK:
      return {
        ...state,
        [postId]: {
          ...state[postId],
          items: state[postId].items.map(comment => comment.id === id
            ? {...comment, commentBlocked: value}
            : comment)
        }
      }
    case SET_NEW_COMMENT_OVERLAY_BLOCK:
      return {
        ...state,
        showNewCommentOverlayBlock : value
      }
    case VOTE_COMMENT:
      return {
        ...state,
        [postId]: {
          ...state[postId],
          items: state[postId].items.map(comment => comment.id === id
            ? {...comment, voteScore: voteScore}
            : comment)
        }
      }
    default:
      return state;
  }
}

export default comments