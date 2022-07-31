import { api } from "helpers/consts";

/**
 * 
 * @returns StoreGroup list
 */
export const getStoreGroups = async () => {
    const res = await api.get(`/storeGroup`);
    return res.data.data;
};

/**
 * 
 * @param {StoreGroup} storeGroup 
 * @param {file} file 
 * @returns 
 */
export const upsertStoreGroup = async (storeGroup, file) => {
    const formData = new FormData();
    formData.append('file', file)
    formData.append('storeGroup', JSON.stringify(storeGroup))
    return await api.post(`/storeGroup`, formData);
};