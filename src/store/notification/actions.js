import { getBrands } from "./services";

export const GET_BRANDS = "GET_BRANDS"

/**
 * 
 * @returns Brand list
 */
export const getBrandsAsync = async () => {
  try {
    const res = await getBrands();
    return {
      type: GET_BRANDS,
      payload: { brands: res },
    }
  } catch (error) {
    return error
  }
}


