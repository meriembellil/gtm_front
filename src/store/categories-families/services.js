import { api } from "helpers/consts";

/**
 * 
 * @returns Family list
 */
 export const getFamilies = async () => {
    const res = await api.get(`/family`)
    return res.data.data;
}

/**
 * 
 * @param {Family} family 
 * @returns Created Family
 */
 export const upsertFamily = async (family) => {
    const res = await api.post(`/family`, family)
    return res.data;
}

/**
 * 
 * @returns Category list
 */
 export const getCategoriesList = async () => {
    const res = await api.get(`/category`)
    return res.data.data;
}

/**
 * 
 * @returns Category list by family
 */
 export const getCategories = async (familyId) => {
    const res = await api.get(`/category/${familyId}`)
    return res.data.data;
}

/**
 * 
 * @param {Category} category 
 * @returns Created Category
 */
 export const upsertCategory = async (category) => {
    const res = await api.post(`/category`, category)
    return res.data;
}