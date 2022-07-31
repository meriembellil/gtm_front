import { getDisplayList, getDisplaySectionsBydisplayTypeId, getDisplayTypes } from "./services";

export const GET_DISPLAYS = "GET_DISPLAY_List"
export const GET_DISPLAY_TYPES = "GET_DISPLAY_TYPES"
export const GET_DISPLAY_SECTIONS = "GET_DISPLAY_SECTIONS"

/**
 * 
 * @returns Display list
 */
 export const getDisplayListAsync = async () => {
  try {
    const res = await getDisplayList();
    return {
      type: GET_DISPLAYS,
      payload: { displayList: res },
    }
  } catch (error) {
    return error
  }
}

/**
 * 
 * @returns DisplayType list
 */
export const getDisplayTypesAsync = async () => {
  try {
    const res = await getDisplayTypes();
    return {
      type: GET_DISPLAY_TYPES,
      payload: { displayTypes: res },
    }
  } catch (error) {
    return error
  }
}

/**
 * 
 * @returns DisplaySection list By displayTypeId
 */
 export const getDisplaySectionsBydisplayTypeIdAsync = async (displayTypeId) => {
  try {
    const res = await getDisplaySectionsBydisplayTypeId(displayTypeId);
    return {
      type: GET_DISPLAY_SECTIONS,
      payload: { displaySections: res },
    }
  } catch (error) {
    return error
  }
}