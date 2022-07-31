import { api } from "helpers/consts";

/**
 * 
 * @returns stores visits
 */
export const getStoreVisits = async (storeId, limit, offset) => {
    const res = await api.get(`/store/visits/${storeId}/${limit}/${offset}`)
    return res.data.data
}

/**
 * 
 * @returns stores list
 */
export const getStores = async () => {
    const res = await api.get(`/store`)
    return res.data.data
}

/**
 * 
 * @param {Store} store 
 * @returns created store
 */
export const upsertStore = async (store, file, files, customFieldValues) => {
    const formData = new FormData();
    formData.append('customFieldValues', JSON.stringify(customFieldValues))
    formData.append('store', JSON.stringify(store))
    formData.append('file', file)
    files.forEach((f) => {
        formData.append('files', f)
    })
    const res = await api.post(`/store`, formData)
    return res.data
}