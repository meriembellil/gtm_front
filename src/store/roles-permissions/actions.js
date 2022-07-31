import { getRoles } from "./services";

export const GET_ROLES_LIST = "GET_ROLES_LIST"

/**
 * 
 * @returns roles list
 */
 export const getRolesList = async () => {
    const res = await getRoles();
    return {
      type: GET_ROLES_LIST,
      payload: { roles: res },
    }
  }
