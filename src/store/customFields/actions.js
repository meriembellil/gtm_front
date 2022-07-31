import { getCustomFieldsByTableName } from "./services";

export const GET_CUSTOM_FIELDS = "GET_CUSTOM_FIELDS"

/**
 * 
 * @param {CustomField} customField 
 * @returns created
 */
export const getCustomFieldsByTableNameAsync = async (table_name) => {
  try {
    const res = await getCustomFieldsByTableName(table_name);
    return {
      type: GET_CUSTOM_FIELDS,
      payload: { fields: res },
    }
  } catch (error) {
    return error
  }
}