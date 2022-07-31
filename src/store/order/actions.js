import { getOrders } from "./services";

export const GET_ORDERS = "GET_ORDERS"

/**
 * 
 * @returns Order list
 */
export const getOrdersAsync = async () => {
  try {
    const res = await getOrders();
    return {
      type: GET_ORDERS,
      payload: { orders: res },
    }
  } catch (error) {
    return error
  }
}