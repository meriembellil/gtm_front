import { getStores } from "./services";

export const GET_STORES = "GET_STORES"
export const GET_STORE = "GET_STORE"

/**
 * 
 * @returns stores list
 */
export const getStoresAsync = async () => {
  try {
    const res = await getStores();
    return {
      type: GET_STORES,
      payload: { stores: res },
    }
  } catch (error) {
    return error
  }

}