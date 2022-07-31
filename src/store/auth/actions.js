import { authenticate } from "store/auth/services"
export const LOGIN_USER = "LOGIN_USER"
export const LOGOUT = "LOGOUT"

/**
 * @param {Object} user 
 * @description this function log user
 */
export const login = async (user) => {

  const res = await authenticate(user)
  if (res.data) {
    localStorage.setItem('authUser', res.data);
  }
  return {
    type: LOGIN_USER,
    payload: { token: res.data },
  }
}

/**
 * @description logout connected user
 */
export const logout = async () => {

  await localStorage.removeItem('authUser');

  return {
    type: LOGOUT,
    payload: { token: null },
  }
}  