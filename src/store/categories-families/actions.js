import { getCategories, getFamilies } from "./services";

export const GET_FAMILIES = "GET_FAMILIES"
export const GET_CATEGORIES = "GET_CATEGORIES"

/**
 * 
 * @returns Family list
 */
export const getFamiliesAsync = async () => {
  try {
    const res = await getFamilies();
    return {
      type: GET_FAMILIES,
      payload: { families: res },
    }
  } catch (error) {
    return error
  }
}

/**
 * 
 * @returns Category list
 */
export const getCategoriesAsync = async (familyId) => {
  try {
    const res = await getCategories(familyId);
    return {
      type: GET_CATEGORIES,
      payload: { categories: res },
    }
  } catch (error) {
    return error
  }
}