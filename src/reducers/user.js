import {
  SAVE_USER_NAME
} from '../actions'

function user(state = { username: ''}, action) {

  const { username } = action

  switch (action.type) {
    case SAVE_USER_NAME:
      return {
        ...state,
        username: username,
      }
    default:
      return state;
  }
}

export default user