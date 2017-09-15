import { sortColumns } from '../actions'
import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  SET_POST_SORT_COLUMN,
  SET_POST_OVERLAY_BLOCK,
  VOTE_POST,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST,
} from '../actions/types'

const initialPostState = {
  init: false,
  isFetching: false,
  sortBy: sortColumns.SCORE,
  items: []
}

function posts(state = initialPostState, action) {

  const { posts, post,  sortColumnName, id, voteScore, postOverlayValue } = action

  switch (action.type) {
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        init: true,
        isFetching: false,
        items: posts,
      }
    case SET_POST_SORT_COLUMN:
      return {
        ...state,
        sortBy: sortColumnName
      }
    case VOTE_POST:
      return {
        ...state,
        items: state.items.map(post => post.id === id
          ? {...post, voteScore: voteScore}
          : post)
      }
    case SET_POST_OVERLAY_BLOCK:
      return {
        ...state,
        items: state.items.map(post => post.id === id
          ? {...post, postBlocked: postOverlayValue}
          : post)
      }
    case ADD_POST: {
      return {
        ...state,
        items: [
          ...state.items,
          post
        ]
      }
    }
    case UPDATE_POST: {
      return {
        ...state,
        items: state.items.map(existsPost => existsPost.id === post.id
          ? post
          : existsPost)
      }
    }
    case DELETE_POST:
      return {
        ...state,
        items: state.items.filter(post => post.id !== id)
      }
    default:
      return state;
  }
}

export default posts