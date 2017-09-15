import { SAVE_USER_NAME } from 'types'

export const saveUserName = (username) => ({
  type: SAVE_USER_NAME,
  username: username
})