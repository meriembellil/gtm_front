import { getPlannigDaily } from "./services";

export const GET_PLANNINGDAILY = "GET_PLANNINGDAILY"

/**
 * 
 * @returns Plannig Daily list
 */
export const getPlannigDailyAsync = async (liste,StartDate,endDate) => {
  try {
    const res = await getPlannigDaily(liste,StartDate,endDate);
    return {
      type: GET_PLANNINGDAILY,
      payload: { PlannigDailys: res },
    }
  } catch (error) {
    return error
  }
}