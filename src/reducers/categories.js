import {
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES
} from '../actions'

function categories(state = {init: false , isFetching: false, items: []}, action) {

  const { categories } = action

  switch (action.type) {
    case REQUEST_CATEGORIES:
      return {
        ...state,
        isFetching: true,
      }
    case RECEIVE_CATEGORIES:
      return {
        ...state,
        init: true,
        isFetching: false,
        items: categories,
      }
    default:
      return state
  }
}

export default categories