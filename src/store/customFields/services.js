import { api } from "helpers/consts";

/**
 * 
 * @param {CustomField} customField 
 * @returns created customField
 */
export const upsertCustomField = async (customField) => {
    const res = await api.post(`/customField/`, customField)
    return res.data;
}

/**
 * 
 * @param {String} table_name 
 * @returns CustomField by table_name
 */
export const getCustomFieldsByTableName = async (table_name) => {
    const res = await api.get(`/customField/${table_name}`)
    return res.data.data;
}

/**
 * 
 * @param {Array} values  
 * @param {Store} store 
 * @returns values created
 */
export const upsertCustomFieldValues = async (values, store) => {
    values.forEach((value) => {
        value.store=store
    });
    const res = await api.post(`/customField/values`, values)
    return res.data;
}

export const getCustomFieldValuesByStore = async (storeId) => {
    const res = await api.get(`/customFieldValue/${storeId}`)
    return res.data.data;
}