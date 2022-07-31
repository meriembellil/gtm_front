import { api } from "helpers/consts";

/**
 * 
 * @returns ReferencedProduct list
 */
 export const getReferencedProductsByStore = async (storeId) => {
    const res = await api.get(`/referencedProduct/${storeId}`);
    return res.data.data
};

/**
 * @param {[ReferencedProduct]} referencedProducts array of ReferencedProduct 
 */
export const upsertReferencedProducts = async (referencedProducts) => {
    const res = await api.post(`/referencedProduct`, referencedProducts);
    return res
};
