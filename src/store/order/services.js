import { api } from "helpers/consts";

/**
 * 
 * @returns Order list
 */
export const getOrders = async () => {
    const res = await api.get(`/order`);
    return res.data.data
};

/**
 * 
 * @param {Order} order
 * @param {[OrderDetail]} 
 * @param {file} file 
 * @returns 
 */
export const upsertOrder = async (order, orderDetail, files) => {
    const formData = new FormData();
    files?.forEach(element => {
        formData.append("files", element)
    });
    formData.append('order', JSON.stringify(order))
    formData.append('orderDetail', JSON.stringify(orderDetail))
    const res = await api.post(`/order`, formData).then;
    return res
};