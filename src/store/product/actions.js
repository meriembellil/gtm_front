import { getProducts } from "./services";

export const GET_PRODUCTS = "GET_PRODUCTS"

/**
 * 
 * @returns Brand list
 */
export const getProductsAsync = async () => {
  try {
    const res = await getProducts();
    return {
      type: GET_PRODUCTS,
      payload: { products: res },
    }
  } catch (error) {
    return error
  }
}