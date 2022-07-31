import { API_URL, api } from "../consts";

/**
 * 
 * @param {File} file 
 * @param {Directory} dir directory name
 * @returns the path of the uploaded file
 */
export const uploadFile = async (file, dir) => {
    const formData = new FormData();
    formData.append('file', file)
    const res = await api.post(`${API_URL}/uploadFile/${dir}`, formData)
    return res;
}

/**
 * 
 * @param {files} array of picturesfiles 
 * @param {int} storeId
 * @param {Folder} dir folder when we store images 
 * @returns images uploaded
 */
export const uploadFiles = async (files, dir) => {
    const formData = new FormData();
    files.forEach(element => {
        formData.append('files', element)
    });
    const res = await api.post(`${API_URL}/uploadMultipleFiles/${dir}`, formData)
    return res.data;
}