import { api } from "helpers/consts";

/**
 * DisplayType Api's
 */

/**
 * @returns DisplayType list
 */
export const getDisplayTypes = async () => {
    const res = await api.get(`/displayType`);
    return res.data.data
};

/**
 * 
 * @param {DisplayType} type 
 * @description this function create new DisplayType object 
 */
export const upsertDisplayType = async (type) => {
    const res = await api.post(`/displayType`, type)
    return res
}

/**
 * DisplaySection Api's
 */

/**
 * @returns DisplaySection list by displayTypeId
 */
export const getDisplaySectionsBydisplayTypeId = async (displayTypeId) => {
    const res = await api.get(`/displaySection/${displayTypeId}`);
    return res.data.data
};

/**
 * 
 * @param {DisplaySection} section 
 * @description this function create new DisplaySection object 
 */
export const upsertDisplaySection = async (section, customFields) => {
    const res = await api.post(`/displaySection`, { displaySection: section, customFields: customFields })
    return res
}

/**
 * Display Api's
 */

/**
 * 
 * @param {Display} display 
 * @description this function create new Display object 
 */
export const upsertDisplay = async (display, files, customValues) => {
    const formData = new FormData();
    files?.forEach(element => {
        formData.append("files", element.file)
        delete element.file
    });
    formData.append('display', JSON.stringify(display))
    formData.append('customValues', JSON.stringify(customValues))
    formData.append('data', JSON.stringify(files))
    const res = await api.post(`/display`, formData)
    return res
}

/**
 * @param {Integer} id displayId 
 */
export const deleteDisplayById = async (id) => {
    const res = await api.delete(`/display/${id}`);
    return res
};

/**
 * @returns Display list
 */
export const getDisplayList = async () => {
    const res = await api.get(`/display`);
    return res.data.data
};

/**
 * 
 * @param {Integer} userId 
 * @param {Date} from 
 * @param {Date} to 
 * @returns Display list by user between two dates
 */
export const getDisplayListByUser = async (userId, from, to) => {
    const res = await api.get(`/display/${userId}/${from}/${to}`);
    return res.data.data
};