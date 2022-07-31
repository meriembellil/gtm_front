import { api } from "helpers/consts";

/**
 * 
 * @returns Product list
 */
export const getProducts = async () => {
    const res = await api.get(`/product`);
    return res.data.data
};

/**
 * 
 * @param {Product} product 
 * @param {File} selectedFile 
 * @param {Files} selectedFiles 
 */
export const upsertProduct = async (product, internalCodes, selectedFile, selectedFiles) => {
    const formData = new FormData();
    formData.append("product", JSON.stringify(product))
    formData.append("internalCodes", JSON.stringify(internalCodes))
    formData.append("file", selectedFile)
    selectedFiles?.forEach(element => {
        formData.append("files", element)
    });
    await api.post(`/product`, formData)
};