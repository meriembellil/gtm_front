import { api } from "helpers/consts";

/**
 * 
 * @returns Plannig Daily list
 */
export const getPlannigDaily = async (liste,StartDate,endDate) => {
    const res = await api.get(`/visit/multiple/`+liste+"/"+StartDate+"/"+endDate);
    return res.data.data
};