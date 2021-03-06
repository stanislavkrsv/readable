import * as ReadableAPI from '../utils/ReadableAPI'
import {
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES
} from './types'

export const requestCategories = () => ({
  type: REQUEST_CATEGORIES,
})

export const receiveCategories = (categories) => ({
  type: RECEIVE_CATEGORIES,
  categories: categories
})

const fetchCategories = () => dispatch => {
  dispatch(requestCategories())
  return ReadableAPI.getCategories().then(categories => { dispatch(receiveCategories(categories))})
}

const shouldFetchCategories = (state) => {
  const categories = state.categories
  if (!categories) {
    return true
  }
  if (categories.isFetching) {
    return false
  }
  if (!categories.items.length) {
    return true
  }
}

export const fetchCategoriesIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchCategories(getState())) {
    return dispatch(fetchCategories())
  }
}