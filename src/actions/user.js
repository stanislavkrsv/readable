export const SAVE_USER_NAME = 'SAVE_USER_NAME'

export const saveUserName = (username) => ({
  type: SAVE_USER_NAME,
  username: username
})