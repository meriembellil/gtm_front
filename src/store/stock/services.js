import { api } from "helpers/consts";

/**
 * @param {stock} stock array of stock 
 */
export const upsertStock = async (stock) => {
    const res = await api.post(`/stock`, stock);
    return res
};

/**
 * @param {Integer} storeId 
 * return stock (array)
 */
export const findStockByStore = async (storeId, from) => {
    const res = await api.get(`/stock/${storeId}/${from}`);
    return res.data.data
};

/**
 * @param {Integer} userId 
 * return stock by user(array)
 */
export const findStockByUser = async (userId, from, to) => {
    const res = await api.get(`/stock/user/${userId}/${from}/${to}`);
    return res.data.data
};

/**
 * @param {Integer} storeId 
 * @param {Integer} days 
 * @returns 
 */
export const findStockDays = async (storeId, days) => {
    const res = await api.get(`/stock/days/${storeId}/${days}`);
    return res.data.data
};

/**
 * stock setting api's
 */

/**
 * @param {StockSetting} stockSetting  
 */
export const upsertStockSetting = async (stockSetting) => {
    const res = await api.post(`/stockSetting`, stockSetting);
    return res
};

/**
 * @return stock setting
 */
export const findStockSetting = async () => {
    const res = await api.get(`/stockSetting`);
    return res.data.data
};