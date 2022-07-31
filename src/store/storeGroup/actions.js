import { getStoreGroups } from "./services";

export const GET_STORE_GROUP = "GET_STORE_GROUP"

/**
 * 
 * @returns Brand list
 */
export const getStoreGroupsAsync = async () => {
  try {
    const res = await getStoreGroups();
    return {
      type: GET_STORE_GROUP,
      payload: { storeGroups: res },
    }
  } catch (error) {
    return error
  }
}