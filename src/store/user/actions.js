import { getUserByRole, getUserByUsername, getUsers, upsertUser } from "store/user/services"
export const GET_PROFILE = "GET_PROFILE"
export const UPDATE_USER = "UPDATE_USER"
export const GET_USERS_LIST = "GET_USERS_LIST"
export const GET_USERS_BY_ROLE = "GET_USERS_BY_ROLE"


export const asyncUpsertUser = async (user, file) => {
  
  /**
   * @param {Object} user
   * @param {File} file
   */
  const res = await upsertUser(user, file);
  return {
    type: UPDATE_USER,
    payload: { user: res },
  }
}

/**
 * @param {string} username 
 * @description this function get user by usernmae
 */
export const getUserProfile = async (username) => {
  const res = await getUserByUsername(username);
  return {
    type: GET_PROFILE,
    payload: { user: res.data },
  }
}

/**
 * 
 * @returns users list
 */
export const getUsersList = async () => {
  const res = await getUsers();
  return {
    type: GET_USERS_LIST,
    payload: { usersList: res },
  }
}

