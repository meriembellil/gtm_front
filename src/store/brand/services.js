import { api } from "helpers/consts";

/**
 * 
 * @returns Brand list
 */
export const getBrands = async () => {
    const res = await api.get(`/brand`);
    return res.data.data
};

/**
 * 
 * @param {Brand} brand 
 * @param {file} file 
 * @returns 
 */
export const upsertBrand = async (brand, file) => {
    const formData = new FormData();
    formData.append('file', file)
    formData.append('brand', JSON.stringify(brand))
    const res = await api.post(`/brand`, formData, {
        onUploadProgress: progressEvent => {
            console.log(Math.round(progressEvent.loaded / progressEvent.total * 100) + '%');
        }
    });
    return res
};